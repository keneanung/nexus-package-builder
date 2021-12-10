import { mocked } from 'jest-mock';
import * as fsFunctions from '../functionsInteractingWithFileSystem';
import { createPackage } from '../createPackage';

jest.mock('../functionsInteractingWithFileSystem');
const mockedFsFunctions = mocked(fsFunctions);
const mockedConsole = jest.spyOn(global.console, 'log');

beforeEach(() => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({ result: true });
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({ result: true });
  mockedFsFunctions.readPackageDefinitionFile.mockClear();
  mockedFsFunctions.readPackageDefinitionFile.mockReturnValue({});
  mockedFsFunctions.writePackageDefinition.mockClear();
  mockedConsole.mockClear();
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  mockedConsole.mockImplementation(() => {});
});

test('Should return true, if FS functions work', () => {
  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeTruthy();
});

test('Should return false, if package definition file was wrong somehow', () => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({ result: false, errorMessage: 'Some error' });

  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeFalsy();
});

test('Should print error message, if package definition file was wrong somehow', () => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({
    result: false,
    errorMessage: 'Some error about def file',
  });

  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedConsole).toBeCalledWith('Some error about def file');
});

test('Should return false, if output path was wrong somehow', () => {
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({ result: false, errorMessage: 'Some error' });

  const result = createPackage('doesNotMatter.yaml', './doesntEither');

  expect(result).toBeFalsy();
});

test('Should print error message, if output path was wrong somehow', () => {
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({
    result: false,
    errorMessage: 'Some error about package path',
  });

  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedConsole).toBeCalledWith('Some error about package path');
});

test('Should get the content of the package defintion file', () => {
  createPackage('doesNotMatter.yaml', './doesntEither');

  expect(mockedFsFunctions.readPackageDefinitionFile).toBeCalledTimes(1);
});

test('Should write the JSON version of a package definition to disk', () => {
  mockedFsFunctions.readPackageDefinitionFile.mockClear();
  mockedFsFunctions.readPackageDefinitionFile.mockReturnValue({
    items: [],
    name: 'some package',
    description: 'I have a desc too',
  });

  createPackage('doesNotMatter', './output');

  expect(mockedFsFunctions.writePackageDefinition).toBeCalledWith(
    '{"name":"some package","enabled":true,"description":"I have a desc too","type":"group","items":[],"id":1}',
    expect.anything(),
  );
});

test('Should tell the write function to correct place to write the package to', () => {
  createPackage('./input.yaml', './packagePath');

  expect(mockedFsFunctions.writePackageDefinition).toBeCalledWith(
    expect.anything(),
    expect.stringMatching(new RegExp('/packagePath/input.nxs$')),
  );
});
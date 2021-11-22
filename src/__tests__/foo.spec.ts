import { mocked } from 'ts-jest/utils';
import * as fsFunctions from '../functionsInteractingWithFileSystem';
import { createPackage } from '../foo';

jest.mock('../functionsInteractingWithFileSystem');
const mockedFsFunctions = mocked(fsFunctions);
const mockedConsole = jest.spyOn(global.console, 'log');

beforeEach(() => {
  mockedFsFunctions.checkPackageDefinitionFile.mockClear();
  mockedFsFunctions.checkPackageDefinitionFile.mockReturnValue({ result: true });
  mockedFsFunctions.prepareOutputDirectory.mockClear();
  mockedFsFunctions.prepareOutputDirectory.mockReturnValue({ result: true });
  mockedConsole.mockClear();
  //eslint-disable-next-line @typescript-eslint/no-empty-function
  mockedConsole.mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
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

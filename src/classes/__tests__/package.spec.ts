import { Package } from '../package';
import * as utils from '../../utils';

test('Should return a valid package object', () => {
  const pkg = new Package({}, '');

  expect(pkg).toBeDefined();
});

test('Should initialize all members', () => {
  const pkg = new Package({}, '');

  expect(pkg).toMatchObject({
    id: 1,
    name: '',
    type: 'group',
    enabled: true,
    description: '',
    items: [],
    version: '',
    dependencies: [],
  });
});

test('Should overwrite the name property if given', () => {
  const partialPackage = { name: 'packageName' };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    name: 'packageName',
  });
});

test('Should overwrite the enabled property if given', () => {
  const partialPackage = { enabled: false };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    enabled: false,
  });
});

test('Should overwrite the description property if given', () => {
  const partialPackage = { description: 'Package description' };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    description: 'Package description',
  });
});

test('Should overwrite the version property if given', () => {
  const partialPackage = { version: '1.0.0' };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    version: '1.0.0',
  });
});

test('Should overwrite the dependencies property if given', () => {
  const partialPackage = { dependencies: [
    "foo",
    "bar",
  ] };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    dependencies: [
      "foo",
      "bar",
    ],
  });
});

test('Should keep the id property if given', () => {
  const partialPackage = { id: 255 };

  const pkg = new Package(partialPackage, '');

  expect(pkg).toMatchObject({
    id: 1,
  });
});

test('Should add a reflex to items if given', () => {
  const mockedConvertFunction = jest.spyOn(utils, 'convertNexusReflexArray');
  const partialPackage = { items: [] };

  new Package(partialPackage, '');

  expect(mockedConvertFunction).toBeCalledTimes(1);
  jest.restoreAllMocks();
});

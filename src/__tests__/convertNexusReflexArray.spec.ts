import { convertNexusReflexArray, IdGenerator } from '../utils';

test('Should return empty array if given empty array', () => {
  const result = convertNexusReflexArray([], new IdGenerator());

  expect(result).not.toContain(expect.anything());
});

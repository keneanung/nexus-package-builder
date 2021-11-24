import { NexusFunction } from '../classes/function';
import { Group } from '../classes/group';
import { PartialGroup } from '../types';
import { convertNexusReflexArray, IdGenerator } from '../utils';

test('Should return empty array if given empty array', () => {
  const result = convertNexusReflexArray([], new IdGenerator(), '');

  expect(result.length).toBe(0);
});

test('Should return array with a nexus function if array with partial function', () => {
  const input: Partial<client.Function>[] = [{ type: 'function' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new NexusFunction({}, new IdGenerator(), ''));
});

test('Should return array with a group if array with partial group', () => {
  const input: PartialGroup[] = [{ type: 'group' }];

  const result = convertNexusReflexArray(input, new IdGenerator(), '');

  expect(result).toContainEqual(new Group({}, new IdGenerator(), ''));
});

test('Should throw an error if type property is missing', () => {
  const input: Partial<client.Function>[] = [{ code: 'code' }];

  expect(() => convertNexusReflexArray(input, new IdGenerator(), '')).toThrow(
    'Unrecognized reflex type. Are you missing the "type" property?',
  );
});

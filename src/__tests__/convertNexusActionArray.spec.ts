import { FunctionAction } from '../classes/functionAction';
import { ScriptAction } from '../classes/scriptAction';
import { PartialScriptAction } from '../types';
import { convertNexusActionArray } from '../utils';

test('Should return an empty array on an empty array', () => {
  const result = convertNexusActionArray([], 'definitionFile');

  expect(result.length).toBe(0);
});

test('Should return array with a script action if a script action was given', () => {
  const input: PartialScriptAction[] = [{ action: 'script' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new ScriptAction({}, ''));
});

test('Should return array with a function action if a function action was given', () => {
  const input: Partial<client.FunctionAction>[] = [{ action: 'function' }];

  const result = convertNexusActionArray(input, '');

  expect(result).toContainEqual(new FunctionAction({}));
});

test('Should throw an error if no action key is present in an object', () => {
  const input: PartialScriptAction[] = [{}];

  expect(() => convertNexusActionArray(input, '')).toThrow(
    'Unrecognized action type. Are you missing the "action" property?',
  );
});

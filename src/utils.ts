import { ButtonAction } from './classes/buttonAction';
import { NexusFunction } from './classes/function';
import { FunctionAction } from './classes/functionAction';
import { Group } from './classes/group';
import { ScriptAction } from './classes/scriptAction';
import { PartialAction, PartialFunction, PartialGroup, PartialReflex, PartialScriptAction } from './types';

/**
 * Generator for IDs.
 */
export class IdGenerator {
  private lastId = 0;

  /**
   * Returns a unique identifier.
   *
   * @returns {number} A new id
   */
  getId = (): number => ++this.lastId;
}

const isPartialFunction = (partial: PartialReflex): partial is PartialFunction => {
  return partial.type !== undefined && partial.type === 'function';
};

const isPartialGroup = (partial: PartialReflex): partial is PartialGroup => {
  return partial.type !== undefined && partial.type === 'group';
};

/**
 * Converts an array of potentially partial reflexes to an array of complete reflexes.
 *
 * @param {PartialReflex[]} reflexes The array of partial reflexes to convert.
 * @param {IdGenerator} idGenerator The IdGenerator to use to generate IDs of new items.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Reflex[]} The converted array of (now complete) reflexes.
 */
export const convertNexusReflexArray = (
  reflexes: PartialReflex[],
  idGenerator: IdGenerator,
  packageDefinitionFile: string,
) => {
  const result: client.Reflex[] = [];
  for (const element of reflexes) {
    let convertedElement: client.Reflex;
    if (isPartialFunction(element)) {
      convertedElement = new NexusFunction(element, idGenerator, packageDefinitionFile);
    } else if (isPartialGroup(element)) {
      convertedElement = new Group(element, idGenerator, packageDefinitionFile);
    } else {
      throw new Error('Unrecognized reflex type. Are you missing the "type" property?');
    }
    result.push(convertedElement);
  }
  return result;
};

const isPartialScriptAction = (partialAction: PartialAction): partialAction is PartialScriptAction => {
  return partialAction.action !== undefined && partialAction.action === 'script';
};

const isPartialFunctionAction = (partialAction: PartialAction): partialAction is Partial<client.FunctionAction> => {
  return partialAction.action !== undefined && partialAction.action === 'function';
};

const isPartialButtonAction = (partialAction: PartialAction): partialAction is Partial<client.ButtonAction> => {
  return partialAction.action !== undefined && partialAction.action === 'button';
};

/**
 * Converts an array of potentially partial actions to an array of complete actions.
 *
 * @param {PartialAction[]} actions The array of partial actions to convert.
 * @param {string} packageDefinitionFile The path to the package definition file.
 * @returns {client.Action[]} The converted array of (now complete) actions.
 */
export const convertNexusActionArray = (actions: PartialAction[], packageDefinitionFile: string) => {
  const result: client.Action[] = [];

  for (const element of actions) {
    let convertedElement: client.Action;

    if (isPartialScriptAction(element)) {
      convertedElement = new ScriptAction(element, packageDefinitionFile);
    } else if (isPartialFunctionAction(element)) {
      convertedElement = new FunctionAction(element);
    } else if (isPartialButtonAction(element)) {
      convertedElement = new ButtonAction(element);
    } else {
      throw new Error('Unrecognized action type. Are you missing the "action" property?');
    }
    result.push(convertedElement);
  }

  return result;
};

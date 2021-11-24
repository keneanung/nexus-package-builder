import { NexusFunction } from './classes/function';
import { Group } from './classes/group';
import { PartialGroup, PartialReflex } from './types';

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

const isPartialFunction = (partial: PartialReflex): partial is Partial<client.Function> => {
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

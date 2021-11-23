import { NexusFunction } from './classes/function';
import { PartialReflex } from './types';

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
/**
 * Converts an array of potentially partial reflexes to an array of complete reflexes.
 *
 * @param {PartialReflex[]} reflexes The array of partial reflexes to convert.
 * @param {IdGenerator} idGenerator The IdGenerator to use to generate IDs of new items.
 * @returns {client.Reflex[]} The converted array of (now complete) reflexes.
 */
export const convertNexusReflexArray = (reflexes: PartialReflex[], idGenerator: IdGenerator) => {
  const result: client.Reflex[] = [];
  /*for (const element of reflexes) {
    let convertedElement: client.Reflex;
    if (isPartialFunction(element)) {
      convertedElement = new NexusFunction(element);
    } else {
      throw new Error('Error');
    }
    result.push(convertedElement);
  }
  */
  return result;
};

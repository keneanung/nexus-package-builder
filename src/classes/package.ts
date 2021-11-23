import { PartialPackage } from '../types';
import { convertNexusReflexArray, IdGenerator } from '../utils';

/**
 * Class for a Nexus package.
 */
export class Package implements client.Package {
  private readonly idGenerator: IdGenerator = new IdGenerator();
  name = '';
  enabled = true;
  description = '';
  type: 'group' = 'group';
  id: number;
  items: client.Reflex[] = [];

  /**
   * Constructs a new package instance from a partial definition.
   *
   * @param {PartialPackage} partialPackage Partial package definition. Will be completed with default values.
   */
  constructor(partialPackage: PartialPackage) {
    this.id = this.idGenerator.getId();

    if (partialPackage.name !== undefined) {
      this.name = partialPackage.name;
    }

    if (partialPackage.enabled !== undefined) {
      this.enabled = partialPackage.enabled;
    }

    if (partialPackage.description !== undefined) {
      this.description = partialPackage.description;
    }

    if (partialPackage.items !== undefined) {
      this.items = convertNexusReflexArray(partialPackage.items, this.idGenerator);
    }
  }
}

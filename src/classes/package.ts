import { PartialPackage } from '../types';
import { convertNexusReflexArray, IdGenerator } from '../utils';

/**
 * Class for a Nexus package.
 */
export class Package implements client.Package {
  name = '';
  enabled = true;
  description = '';
  type: 'group' = 'group';
  id: number;
  items: client.Reflex[] = [];
  version = '';
  dependencies: string[] = [];

  /**
   * Constructs a new package instance from a partial definition.
   *
   * @param {PartialPackage} partialPackage Partial package definition. Will be completed with default values.
   * @param {string} packageDefinitionFile Path to the package definition file.
   */
  constructor(partialPackage: PartialPackage, packageDefinitionFile: string) {
    const idGenerator = new IdGenerator();
    this.id = idGenerator.getId();

    if (partialPackage.name !== undefined) {
      this.name = partialPackage.name;
    }

    if (partialPackage.enabled !== undefined) {
      this.enabled = partialPackage.enabled;
    }

    if (partialPackage.description !== undefined) {
      this.description = partialPackage.description;
    }

    if(partialPackage.version !== undefined){
      this.version = partialPackage.version;
    }

    if(partialPackage.dependencies !== undefined){
      this.dependencies = partialPackage.dependencies;
    }

    if (partialPackage.items !== undefined) {
      this.items = convertNexusReflexArray(partialPackage.items, idGenerator, packageDefinitionFile);
    }
  }
}

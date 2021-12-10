import * as path from 'path';
import { Package } from './classes/package';
import {
  checkPackageDefinitionFile,
  prepareOutputDirectory,
  readPackageDefinitionFile,
  writePackageDefinition,
} from './functionsInteractingWithFileSystem';

/**
 * Creates a Nexus package from the given package definition file and saves it at the given location.
 *
 * @param {string} packageDefinition Path to the package definition file
 * @param {string} outputDir Output directory of the nexus package
 * @returns {boolean} THe success status of the operation: on success true, otherwise false.
 */
export const createPackage = (packageDefinition: string, outputDir: string) => {
  const absolutePackageDefinitionPath = path.resolve(packageDefinition);
  const absoluteOutputDirPath = path.resolve(outputDir);

  const packageDefinitionResult = checkPackageDefinitionFile(absolutePackageDefinitionPath);
  if (!packageDefinitionResult.result) {
    console.log(packageDefinitionResult.errorMessage);
    return false;
  }

  const outputDirResult = prepareOutputDirectory(absoluteOutputDirPath);
  if (!outputDirResult.result) {
    console.log(outputDirResult.errorMessage);
    return false;
  }

  const packageDefinitionContent = readPackageDefinitionFile(absolutePackageDefinitionPath);
  const completePackageDefinition = new Package(packageDefinitionContent, absoluteOutputDirPath);

  const outputFileNameWithoutExtension = path.basename(absolutePackageDefinitionPath, '.yaml');
  const absoluteOutputFile = path.resolve(absoluteOutputDirPath, `${outputFileNameWithoutExtension}.nxs`);

  const jsonPackageDefinition = JSON.stringify(completePackageDefinition);
  writePackageDefinition(jsonPackageDefinition, absoluteOutputFile);

  return true;
};

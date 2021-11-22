import * as fs from 'fs';

/**
 * Interface for return values of functions in this module.
 */
export interface ReturnValue {
  /**
   * The operation result.
   */
  result: boolean;

  /**
   * If the operation was unsuccessful, this property contains an error message.
   */
  errorMessage?: string;
}

/**
 * Checks, whether the given package definition file is a usable file.
 *
 * @param {string} absolutePackageDefinitionPath The (absolute) path to the package definition file.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export const checkPackageDefinitionFile = (absolutePackageDefinitionPath: string): ReturnValue => {
  if (!fs.existsSync(absolutePackageDefinitionPath)) {
    return {
      result: false,
      errorMessage: `Package definition file '${absolutePackageDefinitionPath}' does not exist.`,
    };
  }
  if (!fs.statSync(absolutePackageDefinitionPath).isFile()) {
    return { result: false, errorMessage: `Input path '${absolutePackageDefinitionPath}' is not a file.` };
  }
  return { result: true };
};

/**
 * Checks, whether the given output path is a usable director. It creates the directory if it does not exist.
 *
 * @param {string} absoluteOutputDirPath The (absolute) path of the output directory.
 * @returns {ReturnValue} The result key contains the success of the operation. If false, errorMessage contains an error message.
 */
export function prepareOutputDirectory(absoluteOutputDirPath: string): ReturnValue {
  if (!fs.existsSync(absoluteOutputDirPath)) {
    fs.mkdirSync(absoluteOutputDirPath);
  }
  if (fs.statSync(absoluteOutputDirPath).isFile()) {
    return { result: false, errorMessage: `Output directory '${absoluteOutputDirPath}' is a file.` };
  }
  return { result: true };
}

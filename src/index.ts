import { Command } from 'commander';
import { createPackage } from './createPackage';
import { exit } from 'process';

const program = new Command();
program
  .version('0.0.1')
  .argument('<package-definition>', 'YAML file with the package definition.')
  .argument('<output-dir>', 'Output directory');

program.parse();

const result = createPackage(program.args[0], program.args[1]);
exit(result ? 0 : 1);

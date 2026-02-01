#!/usr/bin/env node

import { cac } from 'cac';
import { create } from './commands/create.js';
import { build } from './commands/build.js';

const cli = cac('ps-maker-plugin');

cli
  .command('create [target-dir]', 'Create a new Pixel Stories Maker plugin')
  .action(create);

cli
  .command('build', 'Build the plugin (bundles src/index.ts)')
  .option('-o, --outdir <dir>', 'Output directory', { default: 'dist' })
  .action(build);

cli.help();
cli.version('0.1.0');

// Default to create command when run as "create-ps-maker-plugin"
const args = process.argv.slice(2);
if (args.length === 0 || (!args[0].startsWith('-') && !['create', 'build', 'help', '--help', '-h', '--version', '-v'].includes(args[0]))) {
  process.argv.splice(2, 0, 'create');
}

cli.parse();

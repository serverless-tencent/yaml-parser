#!/usr/bin/env node

import { program } from 'commander';
import { parseCommand } from './parse';

// eslint-disable-next-line
const { version } = require('../package.json');

async function run() {
  program.storeOptionsAsProperties(false).passCommandToAction(false);
  program.version(
    `Serverless Yaml Parser Version: ${version}`,
    '-v, --version',
    'output the current version',
  );

  // inject sub commands
  parseCommand();

  program.on('--help', () => {
    console.log('');
    console.log('Example call:');
    console.log('  $ yparse --help');
  });

  program.parse(process.argv);
}

run();

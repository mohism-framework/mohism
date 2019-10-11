#!/usr/bin/env node
require('colors');

import { resolve } from 'path'; 
import Command from '@mohism/cli-wrapper/dist/libs/command.class';

// init
const instance = new Command({
  root: resolve(`${__dirname}/../..`),
  home: process.env.HOME,
  version: '1.0.0',
});

// register

// run
instance.run();

#!/usr/bin/env node
import { Command } from '@mohism/sloty';

import { resolve } from 'path';

import Create from '../commands/create.action';
import Gen from '../commands/gen.action';
import Init from '../commands/init.action';
import Plugin from '../commands/plugin.action';


require('colors');

const pkg = require('../../package.json');
// init
const instance = new Command({
  name: Object.keys(pkg.bin)[0],
  root: resolve(`${__dirname}/../..`),
  home: process.env.HOME || '/tmp',
  version: pkg.version,
});

// register
instance.add('plugin', Plugin);
instance.add('init', Init);
instance.add('create', Create);

instance.add('gen', Gen);

// run
instance.run();

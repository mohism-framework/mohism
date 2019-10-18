#!/usr/bin/env node
import Command from '@mohism/cli-wrapper/dist/libs/command.class';
import Upgrade from '@mohism/self-upgrade';
import { resolve } from 'path';

import Create from '../commands/create.action';
import Init from '../commands/init.action';

require('colors');

const pkg = require('../../package.json');
// init
const instance = new Command({
  name: Object.keys(pkg.bin)[0],
  root: resolve(`${__dirname}/../..`),
  home: process.env.HOME,
  version: '1.0.0',
});

// register
instance.add('init', Init);
instance.add('create', Create);
instance.add('upgrade', Upgrade);

// run
instance.run();

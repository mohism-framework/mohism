#!/usr/bin/env node
import Prune from '@mohism/prune-node-modules';
import Publish from '@mohism/publish';
import Upgrade from '@mohism/self-upgrade';
import Command from '@mohism/sloty/dist/libs/command.class';
import TsKit from '@mohism/ts-kit';
import { resolve } from 'path';

import Create from '../commands/create.action';
import Init from '../commands/init.action';
import Run from '../commands/run.action';


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
instance.add('init', Init);
instance.add('create', Create);
instance.add('run', Run);
instance.add('ts-kit', TsKit);
instance.add('pu', Publish);
instance.add('upgrade', Upgrade);
instance.add('prune', Prune);

// run
instance.run();

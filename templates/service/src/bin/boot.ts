import { MohismConf } from '@mohism/core';
import { blue } from 'colors';
import { get } from 'config';
import { EOL } from 'os';

import MohismApplication from '@mohism/core/dist/http/mohism-application';
import helloWorld from '../handlers/hello-world';

import('../database/mongo.conn');
import('../database/redis.conn');

const app: MohismApplication = new MohismApplication();

app.mount(helloWorld);

const mohismConf: MohismConf = require('../../mohism.json');

const { port, host } = get('http');

app.start(port);

app.verbose();

if (process.env.NODE_ENV !== 'production') {
  console.log(`${EOL}see: ${blue(`http://${host}:${port}/${mohismConf.name}/ping`)}`);
}

console.log(`${EOL}starting at port ${port}`);

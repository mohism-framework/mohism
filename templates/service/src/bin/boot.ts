import { MohismConf } from '@mohism/core/dist/utils/globalType';
import { blue } from 'colors';
import { get } from 'config';
import Application from 'koa';
import { EOL } from 'os';

import app from '../app';


const mohismConf: MohismConf = require('../../mohism.json');

const { port } = get('http');

(app as Application).listen(port);

if (process.env.NODE_ENV !== 'production') {
  console.log(`see: ${blue(`http://127.0.0.1:${port}/${mohismConf.name}/ping`)}`);
}

console.log(`${EOL}starting at port ${port}`);

const moduleAlias = require('module-alias');
moduleAlias.addAliases({
  "@": __dirname,
});

import { HttpApplication, HttpConf } from '@mohism/core';
import { get } from 'config';

const httpConf: HttpConf = get('http');

const app: HttpApplication = new HttpApplication(httpConf, __dirname);

app.bootstrap();






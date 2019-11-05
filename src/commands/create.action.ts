import ActionBase from '@mohism/cli-wrapper/dist/libs/action.class';
import { ArgvOption } from '@mohism/cli-wrapper/dist/libs/utils/type';
import { Dict } from '@mohism/utils';
import { yellow } from 'colors';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as inquirer from 'inquirer';
import { resolve } from 'path';
import { cp } from 'shelljs';

import { MohismConf } from '../types';


class Create extends ActionBase {
  options(): Dict<ArgvOption> {
    return {};
  }
  description(): string {
    return `Create a new [${yellow('service')}/${'website'.cyan}/${'cronjob'.green}/${'daemon'.blue}]`;
  }

  async run(): Promise<any> {
    const projectRoot = process.cwd();
    const tplRoot = resolve(`${__dirname}/../../templates`);
    if (!existsSync(`${projectRoot}/mohism.json`)) {
      this.warn('Plz run \'mohism init\' first!');
      process.exit(0);
    }
    const mohismConf: MohismConf = require(`${projectRoot}/mohism.json`);
    const children = mohismConf.children;
    const latestId = children.length ? children[children.length - 1].appId + 1 : 1000;

    const answer = await inquirer.prompt([
      {
        type: 'Input',
        name: 'name',
        message: 'Project Name: '
      },
      {
        type: 'list',
        name: 'type',
        choices: ['service', 'website', 'cronjob', 'daemon'],
        message: 'what do you want?',
        default: 'service'
      }
    ]);
    const mohism = Object.assign({ appId: latestId }, answer);
    mkdirSync(`${projectRoot}/${mohism.name}`);
    writeFileSync(`${projectRoot}/${mohism.name}/mohism.json`, JSON.stringify(mohism, null, 2));
    cp('-R', `${tplRoot}/${mohism.type}/*`, `${projectRoot}/${mohism.name}`);
    cp('-R', `${tplRoot}/${mohism.type}/.*`, `${projectRoot}/${mohism.name}`);

    const newpkg = require(`${projectRoot}/${mohism.name}/package.json`);
    newpkg.name = mohism.name;
    writeFileSync(`${projectRoot}/${mohism.name}/package.json`, JSON.stringify(newpkg, null, 2));

    mohismConf.children.push({
      appId: latestId,
      name: mohism.name,
    });

    writeFileSync(`${projectRoot}/mohism.json`, JSON.stringify(mohismConf, null, 2));
    this.info(`Done! Create ${mohism.type} in ${projectRoot}/${mohism.name}/mohism.json`.blue);

    process.exit(0);
  }
}

export default new Create();

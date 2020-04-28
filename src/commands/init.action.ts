import { MohismConf } from '@mohism/core';
import { ActionBase, ArgvOption } from '@mohism/sloty';
import { Dict } from '@mohism/utils';
import { yellow } from 'colors';
import { existsSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { keyInYN, question } from 'readline-sync';
import { cp, exec, which } from 'shelljs';

class Init extends ActionBase {

  options(): Dict<ArgvOption> {
    return {};
  }

  description(): string {
    return '初始化 Mohism 工程架构';
  }

  async run(): Promise<any> {
    const projectRoot = process.cwd();
    const tplRoot = resolve(`${__dirname}/../../templates`);
    if (existsSync(`${projectRoot}/mohism.json`)) {
      this.warn(`Already Init: ${projectRoot}`);
      process.exit(0);
    }

    const mohism: MohismConf = { children: [] };
    const defaultName = projectRoot.split('/').pop();

    mohism.name = question(`Name of this project: (defult: ${defaultName})`.yellow, { defaultInput: defaultName });
    mohism.type = 'composer';
    mohism.children = [];
    console.log(yellow('Preview:'));
    console.log(mohism);
    if (keyInYN('Continue?'.yellow)) {
      writeFileSync(`${projectRoot}/mohism.json`, JSON.stringify(mohism, null, 2));
      writeFileSync(`${projectRoot}/.gitignore`, '');
      cp('-R', `${tplRoot}/common`, '.');
      if (which('git')) {
        exec('git init', {
          silent: true,
        });
      }

      this.info(`Success! Work in : ${projectRoot}`);
      this.info('Run \'mohism create\' to getting start.');
    } else {
      this.info('quit!');
      process.exit(0);
    }
  }
}

export default new Init();

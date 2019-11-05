import ActionBase from '@mohism/cli-wrapper/dist/libs/action.class';
import { ArgvOption } from '@mohism/cli-wrapper/dist/libs/utils/type';
import { Dict } from '@mohism/utils';
import { yellow } from 'colors';
import { existsSync } from 'fs';
import { exec } from 'shelljs';

class RunAction extends ActionBase {

  options(): Dict<ArgvOption> {
    return {};
  }

  description(): string {
    return 'extensions of \'npm run\' ';
  }

  async run(): Promise<any> {
    const [, sub] = this.instance.yargs.argv._;
    if (!sub) {
      this.fatal('usage: mohism run [cmd] , see scripts in package.json ');
    }
    if (!existsSync(`${process.cwd()}/package.json`)) {
      this.fatal(`Not a ${'Node.js'.yellow} project: package.json not found.`);
    }
    if (!existsSync(`${process.cwd()}/node_modules`)) {
      this.fatal(`Run "${yellow('npm install')}" first`);
    }
    const pkg = require(`${process.cwd()}/package.json`);
    const cmd = pkg.scripts[sub] || `echo "missing script: ${sub}"`;
    this.info(cmd);
    exec(cmd, {
      silent: false,
      async: true,
    });
    this.storage.append('run_log', cmd);
  }
}

export default new RunAction();
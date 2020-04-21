import { ActionBase, ArgvOption } from '@mohism/sloty';
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
    const otherOptions: string = (process.argv.slice(4)).join(' ');
    
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
    const cmd = `${pkg.scripts[sub]} ${otherOptions}`;
    if (!cmd) {
      this.fatal(`echo "missing script: ${sub}"`);
    }
    if (pkg.scripts[`pre${sub}`]) {
      this.info(pkg.scripts[`pre${sub}`]);
      exec(pkg.scripts[`pre${sub}`], {
        silent: false,
        async: true,
      });
      this.storage.append('run_log', pkg.scripts[`pre${sub}`]);
    }
    this.info(cmd);
    exec(cmd, {
      silent: false,
      async: true,
    });
    this.storage.append('run_log', cmd);
    if (pkg.scripts[`post${sub}`]) {
      this.info(pkg.scripts[`post${sub}`]);
      exec(pkg.scripts[`post${sub}`], {
        silent: false,
        async: true,
      });
      this.storage.append('run_log', pkg.scripts[`post${sub}`]);
    }
  }
}

export default new RunAction();
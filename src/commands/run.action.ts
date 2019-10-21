import ActionBase from '@mohism/cli-wrapper/dist/libs/action.class';
import { ArgvOption, Dict } from '@mohism/cli-wrapper/dist/libs/utils/type';
import { exec } from 'shelljs';

class RunAction extends ActionBase {

  options(): Dict<ArgvOption> {
    return {
      e: {
        default: 'dev',
        desc: 'spec environment',
      }
    };
  }

  description(): string {
    return `extensions of 'npm run' `;
  }

  async run(options: Dict<any>): Promise<any> {
    const { e: env } = options;
    if (!['dev', 'test', 'prod'].includes(env)) {
      this.err('only supported -e in ["dev", "test", "prod"]');
    }
    let cmd = '';
    switch (env) {
      case 'dev':
        cmd = `NODE_ENV=development npx nodemon -e ts --watch src --exec \"npx ts-node src/bin/boot.ts\"`;
        break;
      case 'test':
        break;
      case 'prod':
        break;
    }
    this.info(cmd);
    exec(cmd, {
      silent: false,
      async: true,
    });
  }
}

export default new RunAction();
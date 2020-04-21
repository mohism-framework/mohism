import { ActionBase, ArgvOption } from '@mohism/sloty';
import { Dict, toAbcDef } from '@mohism/utils';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { EOL } from 'os';

class GenAction extends ActionBase {
  options(): Dict<ArgvOption> {
    return {};
  }

  description(): string {
    return 'generate things ';
  }

  async run(): Promise<any> {
    // start here
    if (!existsSync(`${process.cwd()}/mohism.json`)) {
      this.fatal('可视范围内没有找到 mohism.json, 在下无能为力.');
    }

    console.log('欢迎使用代码助手');
    const options = ['error', 'handler', 'faas', 'middleware', 'models'];
    const type = await this.question.select('选择类型:', options);
    switch (options[type]) {
    case 'error':
      {
        const msg = await this.question.input('错误提示语:');
        const status = await this.question.input('所属状态簇:(如 404)');
        if (!existsSync(`${process.cwd()}/src/errors/${status}.ts`)) {
          writeFileSync(`${process.cwd()}/src/errors/${status}.ts`, `import { MohismError } from "@mohism/core";${EOL}`);
        }
        const seqs = readFileSync(`${process.cwd()}/src/errors/${status}.ts`).toString().match(/setSeq(.*)/g);
        const lastSeq = seqs ? Number.parseInt(seqs[seqs.length - 1].replace(/setSeq\(|\)|;/g, ''), 10) + 1 : 1;
        const content = `${EOL}export const Err${toAbcDef(msg)} = new MohismError('${msg}').setStatus(${status}).setSeq(${lastSeq});`;
        appendFileSync(`${process.cwd()}/src/errors/${status}.ts`, content);
        this.done(`Generated Error: ${msg}(${status})`);

      }
      break;
    default:
      this.fatal('还没来得及实现');
    }
  }
}

export default new GenAction();
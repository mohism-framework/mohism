import { ActionBase, ArgvOption } from '@mohism/sloty';
import { Dict, toAbcDef } from '@mohism/utils';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { resolve } from 'path';

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
    if (!existsSync(`${process.cwd()}/src`)) {
      this.exec('mkdir -p src', {});
    }

    const tplRoot = resolve(`${__dirname}/../../templates`);

    console.log('欢迎使用代码助手');
    const options = ['error', 'handler', 'faas', 'middleware', 'models'];
    const type = await this.question.select('选择类型:', options);
    switch (options[+type]) {
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
    case 'models':
      {
        const modelPath = resolve(`${process.cwd()}/src/models`);
        if (!existsSync(modelPath)) {
          this.exec(`mkdir -p ${modelPath}`, {});
        }
        const modelName = await this.question.input('输入模型名字', 'foo');
        if (existsSync(`${modelPath}/${modelName}.ts`)) {
          this.fatal(`目标 [${modelName}] 已存在，不能顺利创建。`);
        }
        this.info('开始定义数据字段');
        let ctx = readFileSync(`${tplRoot}/codes/model.ts`).toString();
        let quit = false;
        const fileds = [];
        while (!quit) {
          const fieldName = await this.question.input('字段名称');
          const typeOptions = [
            'Number',
            'String',
            'Boolean',
            'Object',
            '一会我自己改'
          ];
          const dataType = await this.question.select('数据类型', typeOptions);
          const defaultValue = await this.question.input('默认值');
          const requireMent = await this.question.confirm('是否必填', false);
          fileds.push(`${fieldName}: { type: ${typeOptions[+dataType]}${defaultValue ? `, default: '${defaultValue}'` : ''}${requireMent ? `, required: ${requireMent}` : ''} },`);
          if (!await this.question.confirm('继续添加字段？', true)) {
            quit = true;
          }
        }
        writeFileSync(`${modelPath}/${modelName}.ts`, ctx.replace('__NAME__', modelName).replace('// __FIELDS__', fileds.join(EOL + '  ')));
        this.info(`成功创建: ${modelPath}/${modelName}.ts`);
      }
      break;
    default:
      this.fatal('还没来得及实现.');
    }
  }
}

export default new GenAction();
import ActionBase from "@mohism/cli-wrapper/dist/libs/action.class";
import Command from "@mohism/cli-wrapper/dist/libs/command.class";
import { Dict, ArgvOption } from "@mohism/cli-wrapper/dist/libs/utils/type";

class RunAction extends ActionBase {

  options(): Dict<ArgvOption> {
    return {
      e: {
        default: 'dev',
        desc: 'environment',
      }
    };
  }

  description(): string {
    return `extensions of 'npm run' `;
  }

  async run(options:Dict<any>):Promise<any>{
    this.info(options);
  }
}

export default new RunAction();
import { Command } from "@oclif/command";
import * as util from "util";
import * as exec from "child_process";
const _cmd = util.promisify(exec.exec);

export default class GCommand extends Command {
  async run() {}

  async cmd(cmd: string) {
    return _cmd(cmd);
  }
}

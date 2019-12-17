import { Command } from '@oclif/command';
import * as exec from 'child_process';
const _cmd = exec.exec;

export default class GCommand extends Command {
  async run() {}

  async cmd(cmd: string) {
    const _c = _cmd(cmd);
    _c.stdout.pipe(process.stdout);
    _c.stderr.pipe(process.stderr);
    return _cmd(cmd);
  }
}

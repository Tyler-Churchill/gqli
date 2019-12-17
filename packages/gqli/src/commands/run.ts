import GCommand from '../GCommand';

export default class Run extends GCommand {
  static description = 'describe the command here';

  static examples = [];

  static flags = {};

  static args = [];

  async run() {
    const { args, flags } = this.parse(Run);
    this.cmd('yarn lerna run --parallel start:example');
  }
}

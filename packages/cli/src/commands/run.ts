import GCommand from '../GCommand'

export default class Run extends GCommand {
  static description = 'describe the command here';

  static examples = [];

  static flags = {};

  static args = [];

  async run () {
    this.cmd('yarn lerna run --parallel start:example')
  }
}

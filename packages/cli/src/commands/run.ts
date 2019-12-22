import GCommand from '../GCommand';

export default class Run extends GCommand {
  static description = 'Runs the given project for development';

  static examples = [];

  static flags = {};

  static args = [];

  async run() {
    this.cmd('ts-node ./src/index.ts');
  }
}

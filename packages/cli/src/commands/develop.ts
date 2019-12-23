import GQLICommand from '../GQLICommand';
import * as path from 'path';
export default class Develop extends GQLICommand {
  static description = 'Runs the given project for development';

  static examples = [];

  static flags = {};

  static args = [];

  async run() {
    this.cmd(
      `${path.resolve(
        'node_modules/@gqli/cli/node_modules/ts-node/dist/bin.js',
      )} ./src/index.ts`,
    );
  }
}

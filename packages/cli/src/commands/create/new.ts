import * as path from 'path';
import GQLICommand from '../../GQLICommand';
import cli from 'cli-ux';

/**
 * Tool command for creating a new GQLI project
 */
export default class New extends GQLICommand {
  static description = 'Generates a starter example GQLI app';

  static examples = [
    `$ gqli create:new ./project/
    `,
  ];

  static flags = {};

  static args = [
    {
      name: "path",
      required: false,
      description: 'relative path to create the new project in',
      default: "./"
    }
  ];

  /*
   * Creates a new project at the specified directory
   */
  async run() {
    const { args } = this.parse(New)
    const userPath = args?.path;
    console.log(this.log("Let's get started!"));
    const name = await cli.prompt('What is your project name?');
    // render the project to the specified directory
    const outputPath = path.resolve(process.cwd(), userPath);
    await this.renderProject(
      {
        projectPath: path.resolve(__dirname, '_project_'),
        toPath: outputPath,
      },
      {
        project: {
          name,
        },
      },
    );
    this.log(
      `Created project: ${name}\nrun > 'cd .${path.normalize(
        path.join(outputPath.replace(process.cwd(), '')),
      )} && gqli develop' to get started!`,
    );
  }
}

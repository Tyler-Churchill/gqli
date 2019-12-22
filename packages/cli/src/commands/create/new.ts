import { promises as fs } from 'fs';
import * as path from 'path';
import GCommand from '../../GCommand';
import * as nunjucks from 'nunjucks';
import cli from 'cli-ux';

export default class New extends GCommand {
  static description = 'Generates a starter example GQLI app';

  static examples = [
    `$ gqli create:new ./project/
    `,
  ];

  static flags = {};

  static args = [];

  async render({ toPath }: { toPath: string }, project: any) {
    const p = path.join(__dirname, '/_project_');
    const uPath = path.join(process.cwd(), toPath);
    try {
      await fs.access(uPath);
    } catch {
      await fs.mkdir(uPath, { recursive: true });
    }

    const env: nunjucks.Environment = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(p),
    );
    const files: string[] = await fs.readdir(p);
    const writes = [];
    for (const name of files) {
      // remove .njk extension from file
      const realName = name.slice(0, -4);
      const data = await env.render(name, project);
      writes.push(fs.writeFile(`${uPath}/${realName}`, data));
    }
    await Promise.all(writes);
  }

  async run() {
    console.log(this.warn("Let's get started!"));
    const name = await cli.prompt('What is your project name?');
    await this.render(
      { toPath: `/${name}` },
      {
        project: {
          // project render context
          name,
        },
      },
    );
  }
}

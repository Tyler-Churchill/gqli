import { Command } from '@oclif/command';
import * as exec from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as nunjucks from 'nunjucks';
const _cmd = exec.exec;

/**
 * Results from performing a GQLICommand.scan
 */
type ScanResults = {
  files: string[];
  dirs: string[];
};

/**
 * Generic GQLI CLI command base
 */
export default class GQLICommand extends Command {
  async run() {}

  /**
   * Exec the specified command
   * @param cmd
   */
  async cmd(cmd: string) {
    const _c = _cmd(cmd);
    _c.stdout.pipe(process.stdout);
    _c.stderr.pipe(process.stderr);
    return _cmd(cmd);
  }

  async scan(
    projectPath: string,
    results: ScanResults = { files: [], dirs: [] },
  ) {
    let files = await fs.readdir(projectPath);
    for (let file of files) {
      let fullPath = path.join(projectPath, file);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        results.dirs.push(path.normalize(fullPath));
        await this.scan(fullPath, results);
      } else {
        results.files.push(path.normalize(fullPath));
      }
    }
    return results;
  }

  /**
   * Renders the specified folder to the output toPath
   */
  async renderProject(
    { projectPath, toPath }: { projectPath: string; toPath: string },
    project: any,
  ) {
    const projectAssets = await this.scan(projectPath);
    // first create folders if not exist
    const writeDirs = [];
    for (const dir of projectAssets.dirs) {
      const dirPath = dir.replace(projectPath, '');
      // get the project equivalent path that should be created or exist already
      const projectEquivDir = toPath + dirPath;
      try {
        await fs.access(projectEquivDir);
      } catch {
        writeDirs.push(fs.mkdir(projectEquivDir, { recursive: true }));
      }
    }
    await Promise.all(writeDirs);
    // now render templates and create files in the folders
    const writeFiles = [];
    const env: nunjucks.Environment = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(projectPath),
    );
    for (const file of projectAssets.files) {
      const fileName = file.replace('.njk', '');
      // load template data from project file
      const data = env.render(file, project);
      // write template data to proper user project
      const projectFileName = fileName.replace(projectPath, '');
      const projectEquivFile = path.join(toPath, projectFileName);
      writeFiles.push(fs.writeFile(projectEquivFile, data));
    }
    await Promise.all(writeFiles);
  }
}

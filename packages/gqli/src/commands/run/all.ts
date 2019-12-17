import GCommand from "../../GCommand";

export default class All extends GCommand {
  static description = "Bring up the development setup";

  static examples = [`$ gqli up`];

  static flags = {};

  static args = [];

  async run() {
    this.log("Starting app");
    await this.cmd("docker-compose up");
  }
}

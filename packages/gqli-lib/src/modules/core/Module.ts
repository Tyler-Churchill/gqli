export type ModuleExport = {
  resolvers: Array<Function | string>;
};

export type ServiceExport = {
  services: Array<any>;
};

export type ModuleDependency = {
  name: string;
  version: string;
};

/**
 * Module lifecyle methods
 */
interface ModuleLifeCycle {
  onInstall?(): Promise<void>;
}

/**
 * Base module
 */
export abstract class Module implements ModuleLifeCycle {
  name!: string;

  abstract onInstall(): Promise<void>;

  abstract dependencies(): Array<ModuleDependency>;

  abstract export(): ModuleExport;

  protected services(): ServiceExport {
    return {
      services: []
    };
  }
}

export const TModule = typeof Module;

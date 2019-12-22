export type ModuleExport = {
  resolvers: Array<Function | string>;
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
}

export class ModuleLoader<T> {
  // constructor(private context: Object) {}
  // getInstance(name: string, ...args: any[]): T {
  //   const instance = Object.create(this.context[name].prototype);
  //   instance.constructor.apply(instance, args);
  //   return <T>instance;
  // }
}

export const TModule = typeof Module;

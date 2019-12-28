import { Module } from '@gqli/lib';
import { Resolver, Query } from 'type-graphql';
import module from '../package.json';

@Resolver()
class ModuleBaseResolver {
  @Query(returns => String)
  getVersion() {
    return '1.0.0';
  }
}

/**
 * Base module which outputs the current version of gqli installed 
 */
export class BaseModule extends Module {
  constructor() {
    super();
    this.name = module.name;
  }
  w
  dependencies() {
    return [];
  }

  async onInstall() { }

  export() {
    return {
      resolvers: [ModuleBaseResolver],
    };
  }
}

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

export class BaseModule extends Module {
  constructor() {
    super();
    this.name = module.name;
  }

  dependencies() {
    return [];
  }

  async onInstall() {}

  export() {
    return {
      resolvers: [ModuleBaseResolver],
    };
  }
}

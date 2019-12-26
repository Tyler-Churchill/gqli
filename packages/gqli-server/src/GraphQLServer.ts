import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { Module, ModuleExport, GQLIError } from '@gqli/lib';
import { Server } from 'http';
import { BaseModule } from '@gqli/module-base';

type GraphQLServerOptions = {
  port?: number;
  useDefaultModules?: boolean;
};

/**
 * GraphQL server powered by Express and Apollo,
 * can be extended in the future as an interface
 * to implement other server configs
 */
export class GraphQLServer {
  options!: GraphQLServerOptions;
  express: express.Application;
  server!: any;
  schema!: GraphQLSchema;
  modules!: Array<Module>;
  http?: Server;

  constructor(
    options: GraphQLServerOptions = {
      port: 9000,
      useDefaultModules: true,
    },
  ) {
    this.options = options;
    // create an express app
    this.express = express();
    // load default modules
    if (this.options.useDefaultModules) {
      this.modules = [new BaseModule()];
    } else {
      this.modules = [];
    }
  }

  public get apollo(): any {
    return this.server;
  }

  /**
   * Load and verify user specified modules
   */
  private async loadModules(modules: Array<Module>): Promise<ModuleExport> {
    try {
      await Promise.all(
        modules.map(async (module: Module) => {
          try {
            require(module.name);
            await module.onInstall();
            modules.push(module);
          } catch (e) {
            console.log(
              `Cannot find module '${module.name}', did you forget to install it?\nRun: 'yarn|npm install ${module.name}`,
            );
          }
        }),
      );
      const resolvers: Array<Function | string> = this.modules
        .map((module: Module) => module.export().resolvers)
        .flat();
      return {
        resolvers,
      };
    } catch (err) {
      return {
        resolvers: [],
      };
    }
  }

  /**
   * Mount a specified Module onto the GraphQLServer
   * @param module
   */
  public use(module?: Module, modules?: Array<Module>): void {
    if (module) {
      this.modules.push(module);
    }
    if (modules?.length) {
      this.modules.concat(modules);
    }
  }

  /**
   * Runs pre startup tasks then runs the server
   */
  public async start() {
    if (!this.modules?.length) {
      GQLIError('No modules loaded, did you forget to call `server.use()`?');
    }
    const { resolvers } = await this.loadModules(this.modules);

    // build schema
    this.schema = await buildSchema({
      resolvers,
    });

    // create an apollo server with the newly created schema
    this.server = new ApolloServer({
      schema: this.schema,
      introspection: true,
      playground: true,
    });

    // inject express into apollos request middleware
    this.server.applyMiddleware({ app: this.express });

    this.http = await this.express.listen({ port: this.options.port });
    console.log(
      `GQLI Server ready at http://localhost:${this.options.port}${this.server.graphqlPath}`,
    );
    process.on('SIGTERM', () => {
      this.http && this.shutdown() && process.exit(0);
    });
  }

  public async shutdown() {
    this.http?.close();
  }
}

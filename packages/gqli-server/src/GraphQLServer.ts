import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { Module, ModuleExport, GQLIError } from '@gqli/lib';
import { Server } from 'http';
import { BaseModule } from '@gqli/module-base';

/**
 * GraphQL server powered by Express and Apollo
 */
export class GraphQLServer {
  express: express.Application;
  server!: ApolloServer;
  schema!: GraphQLSchema;
  modules!: Array<Module>;
  http?: Server;

  constructor() {
    // create an express app
    this.express = express();
    // load default modules
    this.modules = [new BaseModule()];
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
      GQLIError('No modules loaded, did you forget to call `server.add()`?');
    }
    console.log(this.modules);
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

    this.http = await this.express.listen({ port: 9005 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:9005${this.server.graphqlPath}`,
      ),
    );
    process.on('SIGTERM', () => {
      this.http &&
        this.http.close(() => {
          process.exit(0);
        });
    });
  }
}

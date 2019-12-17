import 'reflect-metadata';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

export class GraphQLServer {
  express: express.Application;
  server: ApolloServer;
  schema: GraphQLSchema;

  constructor(resolvers: Array<Function | string>) {
    // create an express app
    this.express = express();
    this.schema = buildSchemaSync({
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
  }
  /**
   * Local development
   */
  async startLocal() {
    await this.express.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${this.server.graphqlPath}`,
      ),
    );
  }
}

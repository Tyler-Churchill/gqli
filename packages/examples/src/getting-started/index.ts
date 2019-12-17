import { GraphQLServer, CartResolver } from '@namespace/lib';

const server = new GraphQLServer([CartResolver]);

server.startLocal();

import { createTestClient } from 'apollo-server-testing';
import { GraphQLServer } from '@gqli/server';
import gql from 'graphql-tag';

test('server boots', async () => {
  const server = new GraphQLServer();
  await server.start();
  const { query } = createTestClient(server.apollo);
  const VERSION_QUERY = gql`
    query {
      getVersion
    }
  `;
  const res = await query({
    query: VERSION_QUERY,
  });
  expect(res).toMatchSnapshot();
  await server.shutdown();
});

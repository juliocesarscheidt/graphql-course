const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./schema/index.graphql');

const resolvers = require('./resolvers');
const context = require('./context');

const server = require('./server')(typeDefs, resolvers, context);

// port default => 4000
const host = process.env?.APP_HOST ?? '0.0.0.0';
const port = process.env?.APP_PORT ?? 4000;

server.listen({ host, port }).then(({ url }) => {
  console.log(`Listening on ${url}`);
});

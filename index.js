const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./schema/index.graphql');
const resolvers = require('./resolvers');

const server = require('./server')(typeDefs, resolvers);

// port default => 4000
const port = process.env?.APP_PORT ?? 4000;

server.listen({ host: '0.0.0.0', port: port }).then(({ url }) => {
  console.log(`Listening on ${url}`);
});

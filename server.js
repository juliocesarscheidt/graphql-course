const { ApolloServer, gql } = require('apollo-server');

// const typeDefs = gql`
//   type Query {
//   }
// `;
// const resolvers = {
//   Query: {
//   }
// };

module.exports = (typeDefs, resolvers) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};

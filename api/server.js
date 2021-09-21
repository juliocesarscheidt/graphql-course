const { ApolloServer } = require('apollo-server');

module.exports = (typeDefs, resolvers, context = null) => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
};

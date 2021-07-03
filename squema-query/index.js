const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date

  # "!" is to make this parameters mandatory
  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    wage: Float
    logged: Boolean
    testStr: String
  }

  # entrypoints of the API
  # "!" is to make this parameters mandatory
  type Query {
    ola: String!
    dataHora: Date
    loggedUser: User
  }
`;

const resolvers = {
  User: {
    wage(user) {
      console.log(user);
      return user.real_wage;
    },
    testStr() {
      return `Str ${Math.floor(Math.random() * (100 - 10 + 1) + 10)}`;
    },
  },
  Query: {
    ola() {
      return 'Hello World';
    },
    dataHora() {
      return new Date(Date.now()).toISOString();
    },
    loggedUser() {
      return {
        id: 1,
        name: 'user',
        email: 'user@email',
        age: 1,
        real_wage: 1.10,
        logged: true
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// port default => 4000
server.listen({ host: '0.0.0.0', port: 4000 }).then(({ url }) => {
  console.log(`Listening on ${url}`);
});

/*
query
{
  ola
  dataHora
  loggedUser {
    id name email age wage logged testStr
  }
}
*/

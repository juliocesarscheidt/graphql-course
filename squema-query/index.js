const { ApolloServer, gql } = require('apollo-server');

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const buildArr = (numbersAmount, min, max) => {
  const numbers = Array(numbersAmount)
    .fill(0)
    .map(_ => parseInt(randomBetween(min, max), 10));

  return numbers;
}

const users = [
  {
    id: 1,
    name: 'user',
    email: 'user@email',
    age: 1,
    real_wage: 1.10,
    logged: true,
  },
];

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
    hello: String!
    dateHour: Date
    loggedUser: User
    # an array of integers mandatory, but it can be empty
    randomUniqueNumbers: [Int]!
    users: [User]!
  }
`;

const resolvers = {
  User: {
    wage(user) {
      console.log(user);
      return user.real_wage;
    },
    testStr() {
      return `Str ${randomBetween(10, 100)}`;
    },
  },
  Query: {
    hello() {
      return 'Hello World';
    },
    dateHour() {
      return new Date(Date.now()).toISOString();
    },
    loggedUser() {
      return {
        id: 1,
        name: 'user',
        email: 'user@email',
        age: 1,
        real_wage: 1.10,
        logged: true,
      };
    },
    randomUniqueNumbers() {
      const [min, max] = [10, 100];
      const numbers = buildArr(10, min, max);
      
      let unique = [...new Set(numbers)];
      if (unique.length !== 10) {
        const diff = (10 - unique.length);
        console.log(diff); // eslint-disable-line

        unique = [...unique, ...buildArr(diff, min, max)];
      }

      return unique
        .sort((a, b) => a - b); // crescent order;
    },
    users() {
      return users;
    },
  },
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
  dateHour
  loggedUser {
    id name email age wage logged testStr
  }
  randomUniqueNumbers
  users {
    id name email age wage logged testStr
  }
}
*/

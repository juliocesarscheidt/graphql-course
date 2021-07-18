const { users, profiles } = require('../data/datasource');
const MathHandler = require('../utils/MathHandler');

// init instances
const mathHandler = new MathHandler();

module.exports = {
  hello() {
    return 'Hello World';
  },
  dateHour() {
    return new Date(Date.now()).toISOString();
  },
  loggedUser() {
    const randIndex = mathHandler.randomBetween(0, users.length - 1);
    return users[randIndex];
  },
  randomUniqueNumbers() {
    const [min, max] = [10, 100];
    const numbers = mathHandler.buildRandomArr(10, min, max);

    return mathHandler.crescentSort(numbers);
  },
  // first parameter of the resolver is the object itself
  user(_, { id }) {
    // args { id: 1 }
    return users.filterByID(id);
  },
  users() {
    return users;
  },
  profile(_, { id }) {
    // args { id: 1 }
    return profiles.filterByID(id);
  },
  profiles() {
    return profiles;
  },
};

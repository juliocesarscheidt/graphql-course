const { users, profiles } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  hello() {
    return 'Hello World';
  },

  dateHour() {
    return new Date(Date.now()).toISOString();
  },

  loggedUser() {
    const randIndex = arrayMathUtils.randomBetween(0, users.length - 1);
    return users[randIndex];
  },

  randomUniqueNumbers() {
    const [min, max] = [10, 100];
    const numbers = arrayMathUtils.buildRandomArr(10, min, max);

    return arrayMathUtils.crescentSort(numbers);
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

const { users, profiles } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  randomUniqueNumbers() {
    const [min, max] = [10, 100];
    const numbers = arrayMathUtils.buildRandomArr(10, min, max);

    return arrayMathUtils.crescentSort(numbers);
  },

  // first parameter of the resolver is the object itself
  user(_, { filter }) {
    const { id, email } = filter;

    if (id) {
      return users.filterByID(id);
    } else if (email) {
      return users.filterByEmail(email);
    }

    return null;
  },

  users() {
    return users;
  },

  profile(_, { id }) {
    return profiles.filterByID(id);
  },

  profiles() {
    return profiles;
  },
};

const ArrayMathUtils = require('../utils/ArrayMathUtils');

const env = process.env?.ENVIRONMENT || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  randomUniqueNumbers() {
    const [min, max] = [10, 100];
    const numbers = arrayMathUtils.buildRandomArr(10, min, max);

    return arrayMathUtils.crescentSort(numbers);
  },

  // first parameter of the resolver is the object itself
  async user(_, { filter }) {
    const { id, email } = filter;
    let user = null;

    if (id) {
      user = await knex
        .select()
        .from('users')
        .where({ id })
        .first();

    } else if (email) {
      user = await knex
        .select()
        .from('users')
        .where({ email })
        .first();
    }

    return user;
  },

  users() {
    return knex
      .select()
      .from('users');
  },

  profile(_, { id }) {
    return knex
      .select()
      .from('profiles')
      .where({ id })
      .first();
  },

  profiles() {
    return knex
      .select()
      .from('profiles');
  },
};

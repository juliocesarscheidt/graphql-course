const bcrypt = require('bcryptjs');

const ArrayMathUtils = require('../utils/ArrayMathUtils');
const { getUserToken } = require('../utils/JwtUtils');

const env = process.env?.NODE_ENV || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  randomUniqueNumbers() {
    const [min, max] = [10, 100];
    const numbers = arrayMathUtils.buildRandomArr(10, min, max);

    return arrayMathUtils.crescentSort(numbers);
  },

  async login(_, { payload }) {
    const { email, password } = payload;

    const user = await knex
      .select()
      .from('users')
      .where({ email })
      .first();

    if (!user) {
      throw new Error('[ERROR] User not found');
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error('[ERROR] Invalid email or password');
    }

    return getUserToken(user);
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

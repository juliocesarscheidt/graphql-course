const bcrypt = require('bcryptjs');

const { generateUserToken } = require('../../utils/JwtUtils');

module.exports = {
  async login(_, { payload }, context) {
    const { email, password } = payload;

    const user = await context.knex
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

    return generateUserToken(user);
  },

  // first parameter of the resolver is the object itself
  async user(_, { filter }, context) {
    const { id, email } = filter;
    let user = null;

    if (id) {
      user = await context.knex
        .select()
        .from('users')
        .where({ id })
        .first();

    } else if (email) {
      user = await context.knex
        .select()
        .from('users')
        .where({ email })
        .first();
    }

    return user;
  },

  users(_, args, context) {
    return context.knex
      .select()
      .from('users');
  },
};

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

  async user(_, { filter }, context) {
    // non admin users can only see themselves
    if (context) {
      context.validateUserFilter(filter);
    }

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
    if (context) {
      context.validateAdmin();
    }

    return context.knex
      .select()
      .from('users');
  },
};

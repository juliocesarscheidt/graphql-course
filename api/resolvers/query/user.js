const { generateUserToken } = require('../../utils/JwtUtils');
const { comparePasswordSync } = require('../../utils/EncryptionUtils');
const { selectOneByFilter } = require('../../utils/QueryUtils');

const { decodeJwtToken } = require('../../utils/JwtUtils');

module.exports = {
  async login(_, { payload }, context) {
    const { email, password } = payload;
    const user = await selectOneByFilter(context.knex, 'users', { email });
    if (!user) {
      throw new Error('[ERROR] User not found');
    }
    if (!comparePasswordSync(password, user.password)) {
      throw new Error('[ERROR] Invalid email or password');
    }
    return generateUserToken(user);
  },

  async verifyToken(_, { payload }, context) {
    const { token } = payload;

    const tokenDecoded = decodeJwtToken(token);
    if (tokenDecoded) {
      return { ...tokenDecoded, token };
    }

    return null;
  },

  async user(_, { filter }, context) {
    // non admin users can only search themselves
    if (context) {
      context.validateUserFilter(filter);
    }
    const { id, email } = filter;
    let user = null;
    if (id) {
      user = await selectOneByFilter(context.knex, 'users', { id });
    } else if (email) {
      user = await selectOneByFilter(context.knex, 'users', { email });
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

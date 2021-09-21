const jwt = require('jwt-simple');
const authSecret = process.env?.API_AUTH_SECRET;

const env = process.env?.NODE_ENV || 'development';
const knex = require('./infrastructure/database/knex/config/config')(env);

// const mockGetAuthenticatedUser = require('./infrastructure/mock/getAuthenticatedUser');

const context = async ({ req }) => {
  console.log('Context');

  // inject token into req.headers.authorization;
  // await mockGetAuthenticatedUser(req);

  const auth = req?.headers?.authorization;
  const token = auth && auth.replace('Bearer ', '');

  let user = null;
  let admin = false;

  if (token) {
    try {
      const userPayload = jwt.decode(token, authSecret);

      if (new Date(userPayload.exp * 1000) > new Date()) {
        user = userPayload;
        admin = user.profile && user.profile.name === 'Admin';
      }

    } catch (exception) {
      console.error('exception', exception);
    }
  }

  return {
    knex,
    user,
    admin,
    validateUser() {
      if (!user) throw new Error('Access denied');
    },
    validateAdmin() {
      if (!admin) throw new Error('Access denied');
    },
    validateUserFilter(filter) {
      if (admin) return;

      if (!user) throw new Error('Access denied');
      if (!filter) throw new Error('Access denied');

      const { id, email } = filter;
      if (!id && !email) throw new Error('Access denied');

      // common users can only change their own users
      if (id && id !== user.id) throw new Error('Access denied');
      if (email && email !== user.email) throw new Error('Access denied');
    },
  };
}

module.exports = context;

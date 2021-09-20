const jwt = require('jwt-simple');
const authSecret = process.env?.APP_AUTH_SECRET;

const env = process.env?.NODE_ENV || 'development';
const knex = require('./infrastructure/database/knex/config/config')(env);

const getAuthenticatedUser = require('./infrastructure/mock/getAuthenticatedUser');

const context = async ({ req }) => {
  console.log('Context');

  // inject token into req.headers.authorization;
  await getAuthenticatedUser(req);

  const auth = req.headers.authorization;
  const token = auth.replace('Bearer ', '');

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
      if (!user) throw new Error('Denied access');
    },
    validateAdmin() {
      if (!admin) throw new Error('Denied access');
    },
  };
}

module.exports = context;

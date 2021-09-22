const env = process.env?.NODE_ENV || 'development';
const knex = require('./infrastructure/database/knex/config/config')(env);

const { decodeJwtToken } = require('./utils/JwtUtils');

const ADMIN_PROFILE_NAME = 'Admin';

const validateUserFilter = (user, admin, filter) => {
  if (admin) return;

  if (!user) throw new Error('Access denied');
  if (!filter) throw new Error('Access denied');

  const { id, email } = filter;
  if (!id && !email) throw new Error('Access denied');

  // common users can only change their own users
  if (id && id !== user.id) throw new Error('Access denied');
  if (email && email !== user.email) throw new Error('Access denied');
};

const context = async ({ req }) => {
  const auth = req?.headers?.authorization;
  const token = auth && auth.replace('Bearer ', '');

  let user = null;
  let admin = false;

  if (token) {
    const tokenDecoded = decodeJwtToken(token);
    if (tokenDecoded) {
      user = tokenDecoded;
      admin = user?.profile?.name === ADMIN_PROFILE_NAME;
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
      validateUserFilter(user, admin, filter);
    },
  };
}

module.exports = context;

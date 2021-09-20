const jwt = require('jwt-simple');
const authSecret = process.env?.APP_AUTH_SECRET;

const env = process.env?.NODE_ENV || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

const generateUserToken = async (user) => {
  const profile = await knex
      .select(['id', 'name', 'createdAt'])
      .from('profiles')
      .where({ id: user.profileId })
      .first();

  const now = Math.floor(Date.now() / 1000);
  const exp = 1 * 24 * 60 * 60; // 1 day

  const userPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    profileId: user.profileId,
    profile: profile,
    iat: now,
    exp: now + exp,
  };

  return {
    ...userPayload,
    token: jwt.encode(userPayload, authSecret)
  };
};

module.exports = {
  generateUserToken,
}

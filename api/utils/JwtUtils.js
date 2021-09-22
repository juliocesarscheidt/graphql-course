const jwt = require('jwt-simple');
const authSecret = process.env?.API_AUTH_SECRET;

const env = process.env?.NODE_ENV || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

const { selectOneByFilter } = require('./QueryUtils');

const decodeJwtToken = (token) => {
  try {
    const tokenDecoded = jwt.decode(token, authSecret);
    if (new Date(tokenDecoded.exp * 1000) <= new Date()) {
      console.error('Token expired');
      return null;
    }
    return tokenDecoded;

  } catch (exception) {
    console.error('Exception', exception);
    return null;
  }
}

const encodeJwtToken = (payload) => {
  return jwt.encode(payload, authSecret);
}

const generateUserToken = async (user) => {
  const fields = ['id', 'name', 'createdAt'];
  const profile = await selectOneByFilter(knex, 'profiles', { id: user.profileId }, fields);
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
    token: encodeJwtToken(userPayload)
  };
};

module.exports = {
  decodeJwtToken,
  encodeJwtToken,
  generateUserToken,
}

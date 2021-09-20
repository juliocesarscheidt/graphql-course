const env = process.env?.NODE_ENV || 'development';
const knex = require('../database/knex/config/config')(env);

const { generateUserToken } = require('../../utils/JwtUtils');

const getUser = async (profileName) => {
  return knex.select('users.*')
    .from('users')
    .join('profiles', {'profiles.id': 'users.profileId'})
    .where({ 'profiles.name': profileName })
    .first();
}

module.exports = async (req) => {
  const user = await getUser('Admin');
  if (user) {
    const { token } = await generateUserToken(user);
    req.headers = {
      authorization: `Bearer ${token}`,
    };
  }
}

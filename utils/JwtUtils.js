const jwt = require('jwt-simple');
const resolvers = require('../resolvers/user');

const getUserToken = async (user) => {
  const profile = await resolvers.profile(user);
  const now = Math.floor(Date.now() / 1000);
  const exp = 1 * 24 * 60 * 60; // 1 day

  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    // password: user.password,
    // age: user.age,
    // logged: user.logged,
    profileId: user.profileId,
    profile: profile,
    // status: user.status,
    // createdAt: user.createdAt,
    iat: now,
    exp: now + exp,
  };

  console.log('userInfo', userInfo); // eslint-disable-line

  const authSecret = process.env.APP_AUTH_SECRET;

  return {
    ...userInfo,
    token: jwt.encode(userInfo, authSecret)
  };
};

module.exports = {
  getUserToken,
}

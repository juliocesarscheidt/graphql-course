const User = require('./type/user');
const Profile = require('./type/profile');
const Query = require('./query/');
const Mutation = require('./mutations/');

const resolvers = {
  User,
  Profile,
  Query,
  Mutation,
};

module.exports = resolvers;

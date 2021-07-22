const User = require('./user');
const Profile = require('./profile');
const Query = require('./query');
const Mutation = require('../mutations/');

const resolvers = {
  User,
  Profile,
  Query,
  Mutation,
};

module.exports = resolvers;

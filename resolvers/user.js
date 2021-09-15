const env = process.env?.NODE_ENV || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

const resolvers = {
  profile({ profileId }) {
    return knex
      .select(['id', 'name', 'createdAt'])
      .from('profiles')
      .where({ id: profileId })
      .first();
  },
};

module.exports = resolvers;

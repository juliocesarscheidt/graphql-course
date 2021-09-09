const env = process.env?.ENVIRONMENT || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

module.exports = {
  profile({ profileId }) {
    return knex
      .select(['id', 'name', 'createdAt'])
      .from('profiles')
      .where({ id: profileId })
      .first();
  },
};

const { selectOneByFilter } = require('../../utils/QueryUtils');

const resolvers = {
  profile({ profileId }, _, context) {
    const fields = ['id', 'name', 'createdAt'];
    return selectOneByFilter(context.knex, 'profiles', { id: profileId }, fields);
  },
};

module.exports = resolvers;

const resolvers = {
  profile({ profileId }, args, context) {
    return context.knex
      .select(['id', 'name', 'createdAt'])
      .from('profiles')
      .where({ id: profileId })
      .first();
  },
};

module.exports = resolvers;

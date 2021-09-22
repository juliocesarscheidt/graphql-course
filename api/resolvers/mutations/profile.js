const { selectOneByFilter, selectCountByFilter } = require('../../utils/QueryUtils');

module.exports = {
  // using payload input
  async createProfile(_, { payload }, context) {
    if (context) {
      context.validateAdmin();
    }

    const { name } = payload;
    const [result] = await context.knex.insert({ name })
      .into('profiles')
      .onConflict('name')
      .merge()
      .returning('*');

    return result;
  },

  async deleteProfile(_, { filter }, context) {
    if (context) {
      context.validateAdmin();
    }

    const { id } = filter;
    const profile = await selectOneByFilter(context.knex, 'profiles', { id });
    if (!profile) {
      throw new Error('[ERROR] Inexisting profile');
    }
    const counterProfileInUse = await selectCountByFilter(context.knex, 'users', { profileId: id });
    if (counterProfileInUse > 0) {
      throw new Error('[ERROR] Profile is being used');
    }

    await context.knex('profiles')
      .where({ id })
      .delete();

    return profile;
  },

  async updateProfile(_, { filter, payload }, context) {
    if (context) {
      context.validateAdmin();
    }

    const { id } = filter;
    const profile = await selectOneByFilter(context.knex, 'profiles', { id });
    if (!profile) {
      throw new Error('[ERROR] Inexisting profile');
    }
    const updatedProfile = Object.assign(profile, {
      name: payload.name ?? profile.name,
    });

    await context.knex('profiles')
      .where({ id })
      .update(updatedProfile);

    return updatedProfile;
  },
};

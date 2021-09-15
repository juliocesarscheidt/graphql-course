const env = process.env?.NODE_ENV || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

module.exports = {
  // using payload input
  async createProfile(_, { payload }) {
    const { name } = payload;

    const [result] = await knex.insert({ name })
      .into('profiles')
      .onConflict('name')
      .merge()
      .returning('*');

    return result;
  },

  async deleteProfile(_, { filter }) {
    const { id } = filter;

    const profile = await knex
      .select()
      .from('profiles')
      .where({ id })
      .first();
    if (!profile) {
      throw new Error('[ERROR] Inexisting profile');
    }

    const counterInUse = await knex('users')
      .count('id', { as: 'counter' })
      .where({ profileId: id })
      .first();
    if (counterInUse.counter > 0) {
      throw new Error('[ERROR] Profile is being used');
    }

    await knex('profiles')
      .where({ id })
      .delete();

    return profile;
  },

  async updateProfile(_, { filter, payload }) {
    const { id } = filter;

    const profile = await knex
      .select()
      .from('profiles')
      .where({ id })
      .first();
    if (!profile) {
      throw new Error('[ERROR] Inexisting profile');
    }

    const updatedProfile = Object.assign(profile, {
      name: payload.name ?? profile.name,
    });

    await knex('profiles')
      .where({ id })
      .update(updatedProfile);

    return updatedProfile;
  },
};

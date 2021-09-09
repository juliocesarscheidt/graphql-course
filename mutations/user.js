const env = process.env?.ENVIRONMENT || 'development';
const knex = require('../infrastructure/database/knex/config/config')(env);

module.exports = {
  // using payload input
  async createUser(_, { payload }) {
    const { name, email, age, profileId } = payload;

    const counterExistingEmail = await knex('users')
      .count('id', { as: 'counter' })
      .where({ email })
      .first();
    if (counterExistingEmail.counter > 0) {
      throw new Error('[ERROR] Duplicated email');
    }

    const counterExistingProfile = await knex('profiles')
      .count('id', { as: 'counter' })
      .where({ id: profileId })
      .first();
    if (counterExistingProfile.counter <= 0) {
      throw new Error('[ERROR] Inexisting profile');
    }

    const data = {
      name,
      email,
      age,
      logged: true,
      profileId,
      status: 'ACTIVE',
    };

    const [result] = await knex.insert(data)
      .into('users')
      .onConflict('email')
      .merge()
      .returning('*');

    return result;
  },

  async deleteUser(_, { filter }) {
    const { id, email } = filter;

    let user = null;

    if (id) {
      user = await knex
        .select()
        .from('users')
        .where({ id })
        .first();
      if (!user) {
        throw new Error('[ERROR] Inexisting user');
      }

      await knex('users')
        .where({ id })
        .delete();

    } else if (email) {
      user = await knex
        .select()
        .from('users')
        .where({ email })
        .first();
      if (!user) {
        throw new Error('[ERROR] Inexisting user');
      }

      await knex('users')
        .where({ email })
        .delete();
    }

    return user;
  },

  async updateUser(_, { filter, payload }) {
    const { id, email } = filter;

    let user = null;

    if (id) {
      user = await knex
        .select()
        .from('users')
        .where({ id })
        .first();
      if (!user) {
        throw new Error('[ERROR] Inexisting user');
      }

    } else if (email) {
      user = await knex
        .select()
        .from('users')
        .where({ email })
        .first();
      if (!user) {
        throw new Error('[ERROR] Inexisting user');
      }
    }

    // check if this email is already being used by another user
    if (payload.email) {
      const counterExistingEmail = await knex('users')
        .count('id', { as: 'counter' })
        .where({ email: payload.email })
        .andWhere(knex.raw('id != ?', [id]))
        .first();
      if (counterExistingEmail.counter > 0) {
        throw new Error('[ERROR] Duplicated email');
      }
    }
    // check if profile exists
    if (payload.profileId) {
      const counterExistingProfile = await knex('profiles')
        .count('id', { as: 'counter' })
        .where({ id: payload.profileId })
        .first();
      if (counterExistingProfile.counter <= 0) {
        throw new Error('[ERROR] Inexisting profile');
      }
    }

    const updatedUser = Object.assign(user, {
      name: payload.name ?? user.name,
      email: payload.email ?? user.email,
      age: payload.age ?? user.age,
      profileId: payload.profileId ?? user.profileId,
    });

    if (id) {
      await knex('users')
        .where({ id })
        .update(updatedUser);

    } else if (email) {
        await knex('users')
        .where({ email })
        .update(updatedUser);
    }

    return updatedUser;
  },
};

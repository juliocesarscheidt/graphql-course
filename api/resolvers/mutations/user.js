const { encryptPassword } = require('../../utils/EncryptionUtils');
const { selectOneByFilter, selectCountByFilter, selectCountByFilterExtra } = require('../../utils/QueryUtils');

const mutations = {
  registerUser(_, { payload }, context) {
    const { name, email, password, age } = payload;
    return mutations.createUser(
      _,
      { payload: { name, email, password, age } },
      context,
    );
  },

  async createUser(_, { payload }, context) {
    if (context) {
      context.validateAdmin();
    }

    const { name, email, password, age } = payload;
    let { profileId } = payload;
    if (!password) {
      throw new Error('[ERROR] Missing password');
    }

    const counterExistingEmail = await selectCountByFilter(context.knex, 'users', { email });
    if (counterExistingEmail > 0) {
      throw new Error('[ERROR] Duplicated email');
    }

    if (!profileId) {
      // set "Common" profile
      const profileCommon = await selectOneByFilter(context.knex, 'profiles', { name: 'Common' }, ['id']);
      profileId = profileCommon.id;
    } else {
      const counterExistingProfile = await selectCountByFilter(context.knex, 'profiles', { id: profileId });
      if (counterExistingProfile <= 0) {
        throw new Error('[ERROR] Inexisting profile');
      }
    }

    const data = {
      name,
      email,
      password: encryptPassword(password),
      age,
      logged: false,
      profileId,
      status: 'ACTIVE',
    };

    const [result] = await context.knex.insert(data)
      .into('users')
      .onConflict('email')
      .merge()
      .returning('*');

    return result;
  },

  async deleteUser(_, { filter }, context) {
    if (context) {
      context.validateAdmin();
    }
    const { id, email } = filter;
    const whereClause = id ? { id } : { email };

    const user = await selectOneByFilter(context.knex, 'users', whereClause);
    if (!user) {
      throw new Error('[ERROR] Inexisting user');
    }
    await context.knex('users')
      .where(whereClause)
      .delete();

    return user;
  },

  async updateUser(_, { filter, payload }, context) {
    // non admin users can only update themselves
    if (context) {
      context.validateUserFilter(filter);
    }
    const { id, email } = filter;
    const whereClause = id ? { id } : { email };

    const user = await selectOneByFilter(context.knex, 'users', whereClause);
    if (!user) {
      throw new Error('[ERROR] Inexisting user');
    }

    // check if this email is already being used by another user
    if (payload.email) {
      const emailFilter = { email: payload.email };
      let counterExistingEmail = 0;
      if (id) {
        counterExistingEmail = await selectCountByFilterExtra(context.knex, 'users', emailFilter, context.knex.raw('id != ?', [id]));
      } else if (payload.email !== email) {
        counterExistingEmail = await selectCountByFilter(context.knex, 'users', emailFilter);
      }
      if (counterExistingEmail > 0) {
        throw new Error('[ERROR] Duplicated email');
      }
    }

    if (payload.profileId) {
      // only admin can set profiles
      if (!context?.admin && payload.profileId !== user.profileId) {
        throw new Error('[ERROR] Non admin users cannot change their profile');
      }
      // check if profile exists
      const counterExistingProfile = await selectCountByFilter(context.knex, 'profiles', { id: payload.profileId });
      if (counterExistingProfile <= 0) {
        throw new Error('[ERROR] Inexisting profile');
      }
    }

    const updatedUser = Object.assign(user, {
      name: payload.name ?? user.name,
      email: payload.email ?? user.email,
      age: payload.age ?? user.age,
      profileId: payload.profileId ?? user.profileId,
    });
    if (payload.password) {
      updatedUser.password = encryptPassword(payload.password);
    }

    await context.knex('users')
      .where(whereClause)
      .update(updatedUser);

    return updatedUser;
  },
};

module.exports = mutations;

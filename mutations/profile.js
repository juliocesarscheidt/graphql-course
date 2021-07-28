const { users, profiles, nextIDProfiles } = require('../infrastructure/mock/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  // using payload input
  createProfile(_, { payload }) {
    const { name } = payload;

    const data = {
      id: nextIDProfiles(),
      name,
      createdAt: new Date(Date.now()).toISOString(),
    }
    profiles.push(data);

    return data;
  },

  deleteProfile(_, { filter }) {
    const { id } = filter;
    let index = profiles.findIndexByID(id);
    if (index < 0) {
      throw new Error('[ERROR] Inexisting profile');
    }
    // check if profile is used
    if (users.filterBy(id, 'profileId')) {
      throw new Error('[ERROR] Profile is being used');
    }

    const [data] = profiles.splice(index, 1);
    return data;
  },

  updateProfile(_, { filter, payload }) {
    const { id } = filter;
    let index = profiles.findIndexByID(id);
    if (index < 0) {
      throw new Error('[ERROR] Inexisting profile');
    }

    const existingProfile = profiles[index];

    const updatedProfile = Object.assign(existingProfile, {
      name: payload.name ?? existingProfile.name,
    });

    const [data] = profiles.splice(index, 1, updatedProfile);
    return data;
  },
};

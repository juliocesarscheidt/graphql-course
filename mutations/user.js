const { users, profiles, nextID } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  // using payload input
  createUser(_, { payload }) {
    const { name, email, age } = payload;

    const index = users.findIndexByEmail(email.trim());
    if (index > -1) {
      throw new Error('[ERROR] Duplicated email');
    }

    const data = {
      id: nextID(),
      name,
      email,
      age,
      realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
      logged: true,
      profileId: arrayMathUtils.randomBetween(1, profiles.length),
      status: 'ACTIVE',
      createdAt: new Date(Date.now()).toISOString(),
    }
    users.push(data);

    return data;
  },

  deleteUser(_, { filter }) {
    const { id, email } = filter;
    let index = -1;

    if (id) {
      index = users.findIndexByID(id);
    } else if (email) {
      index = users.findIndexByEmail(email.trim());
    }
    if (index < 0) {
      throw new Error('[ERROR] Inexisting user');
    }

    const [data] = users.splice(index, 1);
    return data;
  },

  updateUser(_, { filter, payload }) {
    const { id, email } = filter;
    let index = -1;

    if (id) {
      index = users.findIndexByID(id);
    } else if (email) {
      index = users.findIndexByEmail(email.trim());
    }
    if (index < 0) {
      throw new Error('[ERROR] Inexisting user');
    }

    // check if this email is already being used by another user
    const existingEmail = users.some(u => u.email.trim() === payload.email.trim() && u.id !== id);
    if (existingEmail) {
      throw new Error('[ERROR] Duplicated email');
    }

    const existingUser = users[index];

    const updatedUser = Object.assign(existingUser, {
      name: payload.name ?? existingUser.name,
      email: payload.email ?? existingUser.email,
      age: payload.age ?? existingUser.age,
    });

    const [data] = users.splice(index, 1, updatedUser);
    return data;
  },
};

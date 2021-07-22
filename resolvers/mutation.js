const { users, profiles, nextID } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  createUser(_, { name, email, age }) {
    const existingEmail = users.some(u => u.email.trim() === email.trim());
    if (existingEmail) {
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
    }
    users.push(data);

    return data;
  },

  deleteUser(_, { id }) {
    const existingUserIndex = users.findIndex(u => u.id === id);
    if (existingUserIndex < 0) {
      throw new Error('[ERROR] Inexisting user');
    }

    const [data] = users.splice(existingUserIndex, 1);
    return data;
  },

  updateUser(_, { id, name, email, age }) {
    const existingUserIndex = users.findIndex(u => u.id === id);
    if (existingUserIndex < 0) {
      throw new Error('[ERROR] Inexisting user');
    }

    // check if this email is already used by another user
    const existingEmail = users.some(u => u.email.trim() === email.trim() && u.id !== id);
    if (existingEmail) {
      throw new Error('[ERROR] Duplicated email');
    }

    const existingUser = users[existingUserIndex];

    const updatedUser = Object.assign(existingUser, {
      name: name ?? existingUser.name,
      email: email ?? existingUser.email,
      age: age ?? existingUser.age,
    });

    const [data] = users.splice(existingUserIndex, 1, updatedUser);
    return data;
  },
};

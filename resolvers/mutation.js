const { users, profiles, nextID } = require('../data/datasource');
const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

module.exports = {
  createUser(_, { name, email, age }) {
    const newUser = {
      id: nextID(),
      name,
      email,
      age,
      realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
      logged: true,
      profileId: arrayMathUtils.randomBetween(1, profiles.length),
      status: 'ACTIVE',
    }

    users.push(newUser);

    return newUser;
  }
};

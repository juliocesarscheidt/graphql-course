const ArrayMathUtils = require('../utils/ArrayMathUtils');

// init instances
const arrayMathUtils = new ArrayMathUtils();

let id = 1;
const nextID = () => id++;

const profiles = [
  {
    id: 1,
    name: 'Admin',
  }, {
    id: 2,
    name: 'Manager',
  },
];

const users = [
  {
    id: nextID(),
    name: 'user1',
    email: 'user1@email',
    age: 50,
    realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
    logged: true,
    profileId: arrayMathUtils.randomBetween(1, profiles.length),
    status: 'ACTIVE',
  }, {
    id: nextID(),
    name: 'user2',
    email: 'user2@email',
    age: 75,
    realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
    logged: true,
    profileId: arrayMathUtils.randomBetween(1, profiles.length),
    status: 'INACTIVE',
  },
];

Array.prototype.filterByID = function(id) {
  const selected = this
    .filter(element => element.id === id);
  return selected[0] ?? null;
}

module.exports = {
  nextID,
  users,
  profiles,
};

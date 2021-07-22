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
    name: 'user001',
    email: 'user001@email',
    age: 25,
    realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
    logged: true,
    profileId: arrayMathUtils.randomBetween(1, profiles.length),
    status: 'ACTIVE',
    createdAt: new Date(Date.now()).toISOString(),
  }, {
    id: nextID(),
    name: 'user002',
    email: 'user002@email',
    age: 75,
    realWage: arrayMathUtils.toFloat(arrayMathUtils.randomBetween(1000, 10000)),
    logged: true,
    profileId: arrayMathUtils.randomBetween(1, profiles.length),
    status: 'INACTIVE',
    createdAt: new Date(Date.now()).toISOString(),
  },
];

Array.prototype.filterByID = function(id) {
  const selected = this
    .filter(element => element.id === id);
  return selected[0] ?? null;
}

Array.prototype.filterByEmail = function(email) {
  const selected = this
    .filter(element => element.email.trim() === email.trim());
  return selected[0] ?? null;
}

Array.prototype.findIndexByID = function(id) {
  return this.findIndex(element => element.id === id);
}

Array.prototype.findIndexByEmail = function(email) {
  return this.findIndex(element => element.email.trim() === email.trim());
}

module.exports = {
  nextID,
  users,
  profiles,
};

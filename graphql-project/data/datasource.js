const users = [
  {
    id: 1,
    name: 'user1',
    email: 'user1@email',
    age: 1,
    realWage: 1500.90,
    logged: true,
    profileId: 1,
  }, {
    id: 2,
    name: 'user2',
    email: 'user2@email',
    age: 2,
    realWage: 2500.90,
    logged: true,
    profileId: 2,
  },
];

const profiles = [
  {
    id: 1,
    name: 'Admin',
  }, {
    id: 2,
    name: 'Manager',
  },
];

Array.prototype.filterByID = function(id) {
  const selected = this
    .filter(element => element.id === id);
  return selected[0] ?? null;
}

module.exports = {
  users,
  profiles,
};

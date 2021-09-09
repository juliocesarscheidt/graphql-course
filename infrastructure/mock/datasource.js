const profiles = [];
// const profiles = [
//   {
//     id: 1,
//     name: 'Admin',
//     createdAt: new Date(Date.now()).toISOString(),
//   }, {
//     id: 2,
//     name: 'Manager',
//     createdAt: new Date(Date.now()).toISOString(),
//   },
// ];

const nextIDProfiles = () => (Math.max(...profiles.map(({ id }) => id))) + 1;

let idUsers = 1;
const nextIDUsers = () => idUsers++;

const users = [];
// const users = [
//   {
//     id: nextIDUsers(),
//     name: 'user001',
//     email: 'user001@email',
//     age: 25,
//     logged: true,
//     profileId: arrayMathUtils.randomBetween(1, profiles.length),
//     status: 'ACTIVE',
//     createdAt: new Date(Date.now()).toISOString(),
//   }, {
//     id: nextIDUsers(),
//     name: 'user002',
//     email: 'user002@email',
//     age: 75,
//     logged: true,
//     profileId: arrayMathUtils.randomBetween(1, profiles.length),
//     status: 'INACTIVE',
//     createdAt: new Date(Date.now()).toISOString(),
//   },
// ];

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

Array.prototype.filterBy = function(value, fieldName) {
  const selected = this
    .filter(element => element[fieldName] === value);
  return selected[0] ?? null;
}

Array.prototype.findIndexByID = function(id) {
  return this.findIndex(element => element.id === id);
}

Array.prototype.findIndexByEmail = function(email) {
  return this.findIndex(element => element.email.trim() === email.trim());
}

module.exports = {
  nextIDProfiles,
  nextIDUsers,
  users,
  profiles,
};

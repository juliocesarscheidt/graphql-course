const profiles = [];
const users = [];

const nextIDProfiles = () => (Math.max(...profiles.map(({ id }) => id))) + 1;

let idUsers = 1;
const nextIDUsers = () => idUsers++;

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

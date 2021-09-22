const bcrypt = require('bcryptjs');

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

const comparePasswordSync = (passwordSource, passwordTarget) => {
  return bcrypt.compareSync(passwordSource, passwordTarget);
}

module.exports = {
  encryptPassword,
  comparePasswordSync,
};

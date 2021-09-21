const config = require('../knexfile');

module.exports = env => require('knex')(config[env]);

const env = process.env?.ENVIRONMENT || 'development';
const knex = require('../config/config')(env);

(async () => {
  console.log('[INFO] Running insert...');
  const insert = require('./insert')
  await insert(knex);

  console.log('[INFO] Running select...');
  const select = require('./select')
  await select(knex);

  console.log('[INFO] Running update...');
  const update = require('./update')
  await update(knex);

  knex.destroy();
})();

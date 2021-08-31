const env = process.env?.ENVIRONMENT || 'development';
const knex = require('../config/config')(env);

(async () => {
  console.log('[INFO] Running insert...');
  const insertScript = require('./insert')
  await insertScript(knex);

  console.log('[INFO] Running select...');
  const selectScript = require('./select')
  await selectScript(knex);

  console.log('[INFO] Running update...');
  const updateScript = require('./update')
  await updateScript(knex);

  console.log('[INFO] Running delete...');
  const deleteScript = require('./delete')
  await deleteScript(knex);

  knex.destroy();
})();

module.exports = (knex) => new Promise(async (resolve, reject) => {
  knex.select(['id', 'name'])
    .from('profiles')
    .limit(1)
    .offset(0)
    .first()
    .then(data => {
      console.log('select then', data);
      return resolve(true);
    })
    .catch(err => {
      return reject(err);
    });
});

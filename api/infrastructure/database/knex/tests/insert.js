module.exports = async (knex) => new Promise(async (resolve, reject) => {
  const makeRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const profile = {
    name: `profile_${makeRandom(1000, 10000)}`,
  };

  knex.insert(profile)
    .into('profiles')
    .onConflict('name')
    .merge()
    .returning('*')
    .then(res => {
      console.log('insert result', res);

      knex.select('*')
        .from('profiles')
        .limit(10)
        .offset(0)
        .on('query-response', data => console.log('select query-response', data))
        .on('end', () => console.log('END'))
        .then(_ => {
          return resolve(true);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });
    })
    .catch(err => console.error(err));
});

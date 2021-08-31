module.exports = (knex) => new Promise(async (resolve, reject) => {
  const makeRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const rand = makeRandom(1000, 10000);

  const user = {
    name: `user_${rand}`,
    email: `user_${rand}_inserted@mail.com`,
    age: makeRandom(10, 100),
    logged: false,
    status: 'ACTIVE',
  };
  console.log('user', user);

  knex.insert(user)
    .into('users')
    .onConflict('email')
    .merge()
    .returning('id')
    .then(res => {
      console.log('insert result', res);
      const [id] = res;

      knex('users')
        .whereRaw('id = ?', [id])
        // .whereRaw(`id = ${id}`)
        // .where({ id })
        .delete()
        .then(data => {
          console.log('delete then', data);
          return resolve(true);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        });

    })
    .catch(err => console.error(err));
});

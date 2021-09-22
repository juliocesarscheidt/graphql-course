module.exports = (knex) => new Promise(async (resolve, reject) => {
  const makeRandom = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const rand = makeRandom(1000, 10000);

  try {
    const user = {
      name: `user_${rand}`,
      email: `user_${rand}_inserted@mail.com`,
      password: `password_${rand}`,
      age: makeRandom(10, 100),
      logged: false,
      status: 'ACTIVE',
    };
    console.log('user', user);

    const [inserted] = await knex.insert(user)
      .into('users')
      .onConflict('email')
      .merge()
      .returning('id');
    console.log('inserted', inserted);

    const updated = await knex('users')
      .where({ id: inserted })
      .update({ email: `user_${rand}_updated@mail.com` });
    console.log('updated', updated);

    return resolve(true);

  } catch (error) {
    return reject(err);
  }
});

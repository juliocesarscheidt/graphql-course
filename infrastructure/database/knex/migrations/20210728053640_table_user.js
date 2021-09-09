const users = [
  {
    name: 'user001',
    email: 'user001@email',
    age: 25,
    logged: true,
    profileId: 1,
    status: 'ACTIVE',
  }, {
    name: 'user002',
    email: 'user002@email',
    age: 75,
    logged: true,
    profileId: 2,
    status: 'INACTIVE',
  },
];

exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.integer('age').unsigned();
    table.boolean('logged').defaultTo(true);
    table.integer('profileId').unsigned();
    table.enu('status', ['ACTIVE', 'INACTIVE']);
    table.datetime('createdAt').defaultTo(knex.fn.now());

  }).alterTable('users', table => {
    table.foreign(['profileId']).references('id').inTable('profiles');

  }).then(() => {
    return knex('users').insert(users);
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};

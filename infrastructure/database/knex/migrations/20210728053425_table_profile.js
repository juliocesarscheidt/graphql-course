const profiles = [
  {
    name: 'Admin',
  }, {
    name: 'Manager',
  },
];

exports.up = (knex) => {
  return knex.schema.createTable('profiles', table => {
    table.increments('id').primary();
    table.string('name').notNull().unique();
    table.datetime('createdAt').defaultTo(knex.fn.now());

  }).then(() => {
    return knex('profiles').insert(profiles);
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('profiles');
};

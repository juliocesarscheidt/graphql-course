exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.string('password').notNull();
    table.integer('age').unsigned();
    table.boolean('logged').defaultTo(true);
    table.integer('profileId').unsigned();
    table.enu('status', ['ACTIVE', 'INACTIVE']);
    table.datetime('createdAt').defaultTo(knex.fn.now());

  }).alterTable('users', table => {
    table.foreign(['profileId']).references('id').inTable('profiles');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};

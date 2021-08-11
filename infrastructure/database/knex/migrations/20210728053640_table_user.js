exports.up = (knex) => {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('email').notNull().unique();
    table.integer('age').notNull().unsigned();
    table.boolean('logged').notNull().defaultTo(true);
    table.string('status').notNull();
    table.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};

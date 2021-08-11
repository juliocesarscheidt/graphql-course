exports.up = (knex) => {
  return knex.schema.createTable('users_profiles', table => {
    table.integer('user_id').notNull().unsigned();
    table.integer('profile_id').notNull().unsigned();
    table.datetime('createdAt').defaultTo(knex.fn.now());
    table.primary(['user_id', 'profile_id']);

  }).alterTable('users_profiles', table => {
    table.foreign(['user_id']).references('id').inTable('users');
    table.foreign(['profile_id']).references('id').inTable('profiles');
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users_profiles');
};

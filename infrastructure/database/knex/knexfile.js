module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      port:     5432,
      database: 'graphql_course',
      user:     'postgres',
      password: 'postgres',
      charset:  'utf8',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      port:     5432,
      database: 'graphql_course',
      user:     'postgres',
      password: 'postgres',
      charset:  'utf8',
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     '127.0.0.1',
      port:     5432,
      database: 'graphql_course',
      user:     'postgres',
      password: 'postgres',
      charset:  'utf8',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },
};

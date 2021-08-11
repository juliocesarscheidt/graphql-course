const DATABASE_HOST = process.env.DATABASE_HOST || '127.0.0.1';
const DATABASE_PORT = process.env.DATABASE_PORT || 5432;
const DATABASE_USER = process.env.DATABASE_USER || 'postgres';
const DATABASE_PASS = process.env.DATABASE_PASS || 'postgres';
const DATABASE_NAME = process.env.DATABASE_NAME || 'graphql_course';

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host:     DATABASE_HOST,
      port:     DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASS,
      charset:  'utf8',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:     DATABASE_HOST,
      port:     DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASS,
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
      host:     DATABASE_HOST,
      port:     DATABASE_PORT,
      database: DATABASE_NAME,
      user:     DATABASE_USER,
      password: DATABASE_PASS,
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

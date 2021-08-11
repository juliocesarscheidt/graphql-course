# Knex Migrations

```bash
# run migrations
docker-compose up --build migrations

# run latest or rollback
docker-compose run migrations --knexfile=knexfile.js migrate:latest
docker-compose run migrations --knexfile=knexfile.js migrate:rollback


# creates the knexfile
yarn run knex init

# creates a table
yarn run knex migrate:make table_profile

yarn run knex migrate:make table_user

yarn run knex migrate:make table_user_profile


yarn run knex --knexfile=knexfile.js migrate:latest
yarn run knex --knexfile=knexfile.js migrate:rollback

yarn run knex --knexfile=knexfile.js seed:make <SEED_NAME>
yarn run knex --knexfile=knexfile.js seed:run


# postgres
docker-compose up -d postgres

docker-compose exec postgres sh

# psql -U $DB_USER -p $DB_PORT -h $DB_HOST --dbname=graphql_course -W
> psql -U postgres -p 5432 -h 127.0.0.1 --dbname=graphql_course -W
# TYPE PASSWORD

CREATE EXTENSION hstore;

# connect
\c graphql_course

# list databases
\l

# list schemas
\dn

# list tables
\dt

# list roles
\dg

# list tables, views, and sequences
\d

# list tablespaces
\db

# list views
\dv

# quit
\q

```

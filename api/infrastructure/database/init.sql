CREATE SCHEMA IF NOT EXISTS graphql_course;

\c graphql_course;

-- CREATE TABLE users (
--   id SERIAL NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   email VARCHAR(250) NOT NULL,
--   active BOOLEAN NOT NULL DEFAULT true,
--   created_at TIMESTAMP NOT NULL DEFAULT current_timestamp
-- );

-- INSERT INTO
--   users
-- (id, name, email, active, created_at)
--   VALUES
-- (DEFAULT, 'User 01', 'user01@test.com.br', DEFAULT, DEFAULT),
-- (DEFAULT, 'User 02', 'user02@test.com.br', DEFAULT, DEFAULT),
-- (DEFAULT, 'User 03', 'user03@test.com.br', DEFAULT, DEFAULT),
-- (DEFAULT, 'User 04', 'user04@test.com.br', DEFAULT, DEFAULT),
-- (DEFAULT, 'User 05', 'user05@test.com.br', DEFAULT, DEFAULT);

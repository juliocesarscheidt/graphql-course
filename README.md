# GraphQL Project

This is a tiny project to use GraphQL and its features, it is using Postgres as Database and Knex to migrations.

## Running

```bash
# set variables
export NODE_ENV="development"
export APP_AUTH_SECRET=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

# run postgres
docker-compose up -d postgres

# build migrations
docker-compose build migrations
# run migrations
docker-compose run migrations \
  --knexfile=knexfile.js \
  --env development migrate:latest

# run tests
docker-compose run --entrypoint "yarn run test" migrations

# run app
docker-compose up --build -d app
docker-compose logs -f app
# running on http://localhost:4000/

docker-compose config
```

## GraphQL Query Examples

```graphql
fragment fullProfileData on Profile {
  id
  name
  createdAt
}

fragment fullUserData on User {
  id
  name
  email
  password
  age
  logged
  profileId
  profile { ...fullProfileData }
  status
  createdAt
}

fragment loginData on UserAuthenticationData {
  id
  name
  email
  profileId
  profile { ...fullProfileData }
  token
}

query {
  login(
    payload: {
      email: "user003@email"
      password: "password"
    }
  ) { ...loginData }

  user(filter: {
    id: 1
  }) { ...fullUserData }

  # user(filter: {
  #   email: "user001@email"
  # }) { ...fullUserData }

  users { ...fullUserData }

  profile(id: 1) { ...fullProfileData }

  # profiles { ...fullProfileData }
}
```

## Mutation examples

```graphql
mutation {
  # user
  createUser(
    payload: {
      name: "user003"
      email: "user003@email"
      password: "password"
      age: 25
      profileId: 1
    }
  ) { ...fullUserData }

  registerUser(
    payload: {
      name: "user003"
      email: "user003@email"
      password: "password"
      age: 25
    }
  ) { ...fullUserData }

  deleteUser(
    filter: {
      id: 1
    }
  ) { ...fullUserData }

  deleteUser(
    filter: {
      email: "user003@email"
    }
  ) { ...fullUserData }

  updateUser(
    filter: {
      id: 1
    }
    payload: {
      name: "user0010"
      email: "user0010@email"
      age: 50
      profileId: 1
    }
  ) { ...fullUserData }

  updateUser(
    filter: {
      email: "user001@email"
    }
    payload: {
      name: "user0010"
      email: "user0010@email"
      age: 50
      profileId: 1
    }
  ) { ...fullUserData }

  # profile
  createProfile(
    payload: {
      name: "PROFILE_03"
    }
  ) { ...fullProfileData }

  deleteProfile(
    filter: {
      id: 3
    }
  ) { ...fullProfileData }

  updateProfile(
    filter: {
      id: 2
    }
    payload: {
      name: "PROFILE_2"
    }
  ) { ...fullProfileData }
}
```

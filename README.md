# GraphQL Project

This is a tiny project to use GraphQL and its features

## Query examples

```graphql
// Query examples:

fragment fullProfileData on Profile {
  id
  name
  createdAt
}

fragment fullUserData on User {
  id
  name
  email
  age
  finalWage
  logged
  profileId
  profile { ...fullProfileData }
  status
  createdAt
}

query {
  # randomUniqueNumbers

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

// Mutation examples:
mutation {
  # user
  createUser(
    payload: {
      name: "user003"
      email: "user003@email"
      age: 25
      profileId: 1
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

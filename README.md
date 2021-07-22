# GraphQL Project

This is a tiny project to use GraphQL and its features

## Query examples

```graphql
// Query examples:

fragment fullProfileData on Profile {
  id name
}

fragment fullUserData on User {
  id
  name
  email
  age
  finalWage
  logged
  randomString
  profileId
  profile { ...fullProfileData }
  status
}

query {
  # hello
  dateHour
  # loggedUser { ...fullUserData }
  # randomUniqueNumbers
  user(id: 1) { ...fullUserData }
  # users { ...fullUserData }
  profile(id: 1) { ...fullProfileData }
  # profiles { ...fullProfileData }
}

// Mutation examples:
mutation {
  createUser(
    name:"user003"
    email: "user003@email"
    age: 25
  ) { ...fullUserData }

  deleteUser(
    id: 1
  ) { ...fullUserData }

  updateUser(
    id: 1,
    name:"user0010"
    email: "user0010@email"
    age: 50
  ) { ...fullUserData }
}
```

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
    name:"Test"
    email: "test@mail.com"
    age: 25
  ) { ...fullUserData }
}
```

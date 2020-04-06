export default `
  type Query {
    users: [User],
    user(id: Int): User
  }

  type Mutation {
    addUser(
      name: String!,
      email: String!
    ): Status
  }

  type User {
    id: Int
    name: String
    email: String
  }

  type Status {
    createdId: Int
    err: Error
  }

  type Error {
    message: String
  }
`;
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Order {
    purchaseDate: Date
    books: [Book]
  }

  type User {
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    // profiles: [Profile]!
    // profile(profileId: ID!): Profile
    books: [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;

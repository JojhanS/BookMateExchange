const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    authors: string
    description: string
    bookId: string
    image: string
    link: string
    title: string
  }

  type Order {
    purchaseDate: date
    books: [Book]
  }

  type User {
    firstName: string
    lastName: string
    email: string
    password: string
    orders: [Order]
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeUser(userId: ID!): User
  }
`;

module.exports = typeDefs;

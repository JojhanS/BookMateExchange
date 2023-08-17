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
    purchaseDate: String
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
    profile(userId: ID!): User
    books(searchTerm: String!): [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    removeUser(userId: ID!): User
    addBookToOrder(bookId: ID!): Order
  }
`;

module.exports = typeDefs;

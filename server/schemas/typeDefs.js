const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    authors: string[]
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
`;

module.exports = typeDefs;

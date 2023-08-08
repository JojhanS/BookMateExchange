const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Cars {
    id: ID
    make: String
    model: String
    sold: Boolean
    image: String
    price: String
  }

  type User {
    username: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    allCars: [Cars]
    getCarById(id: ID!): Cars
    getSoldCars(sold: Boolean!): [Cars]
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addCar(
      id: ID!
      make: String!
      model: String!
      sold: Boolean!
      price: String!
    ): Cars

    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

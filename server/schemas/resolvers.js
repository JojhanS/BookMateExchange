const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/index')
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    profile: async (_, { userId }) => {
      try {
        const user = await User.findById(userId); // Assuming you're using Mongoose
        return user; // Return the user profile
      } catch (error) {
        throw new Error('Error fetching user profile');
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    removeUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    
    login: async (parent, { email, password }) => {
      const user = await user.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email and/or password!');
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email and/or password!');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};


module.exports = resolvers;

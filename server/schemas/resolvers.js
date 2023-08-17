const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/index');
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");
const fetchBooks = require('../utils/api');

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
    Query: {
      books: async (_, { bookSearch }) => {
        const books = await fetchBooks(bookSearch); 
        return books.items;
      },
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    removeUser: async (_, { userId }) => {
      try {
        const removedUser = await User.findByIdAndRemove(userId);
        if (!removedUser) {
          throw new Error('User not found');
        }
        return removedUser;
      } catch (error) {
        throw new Error('Error removing user');
      }
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect email and/or password!');
      }

      const correctPassword = await user.isCorrectPassword(password);

      if (!correctPassword) {
        throw new AuthenticationError('Incorrect email and/or password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addBookToOrder: async (_, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to perform this action');
      }
      const bookData = await fetchBooks(bookId);

      if (!bookData || !bookData.volumeInfo) {
        throw new Error('Book not found');
      }

      // Create or update the user's order
      let order = await Order.findOneAndUpdate(
        { user: user._id },
        { $push: { books: bookToAdd } },
        { new: true, upsert: true }
      );

      return order;
    },
  },
};


module.exports = resolvers;

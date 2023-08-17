const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");
const fetchBooks = require('../utils/api');

const resolvers = {
  Query: {
      profile: async (_, { userId }) => {
        try {
          const user = await User.findById(userId);
          return user;
        } catch (error) {
          throw new Error('Error fetching user profile');
        }
      },
      books: async (_, { bookSearch }) => {
        const booksData = await fetchBooks(bookSearch);
        console.log(booksData)

        const books = booksData.items.map((book) => ({
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '', 
          description: book.volumeInfo.description,
          bookId: book.id,
          image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
          link: book.volumeInfo.previewLink,
        }));
  
        return books;
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
        { $push: { books: bookData.volumeInfo } },
        { new: true, upsert: true }
      );

      return order;
    },
  },
};


module.exports = resolvers;

const { carsForSale, users } = require("../data");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    allCars: () => {
      return carsForSale;
    },
    getCarById: (parent, args) => {
      const car = carsForSale.find(({ id }) => id == args.id);
      return car;
    },
    getSoldCars: (parent, args) => {
      const cars = carsForSale.filter(({ sold }) => (sold = args.sold));
      return cars;
    },
    users: (parent, args) => {
      return users;
    },

    user: (parent, { username }) => {
      return users.find((user) => user.username === username);
    },
  },
  Mutation: {
    addCar: (parent, args) => {
      console.log("args", args);
      const newCar = args;
      carsForSale.push(newCar);
      return newCar;
    },
    addUser: async (parent, { username, password }) => {
      //custom method in Model
      const saltRounds = 10;
      password = await bcrypt.hash(password, saltRounds);

      const user = { username, password };
      users.push(user);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = users.find((user) => user.username === username);

      if (!user) {
        throw new Error("No user found with this username");
      }

      const correctPw = await bcrypt.compare(password, user.password);
      if (!correctPw) {
        throw new Error("Incorrect Username or Password");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

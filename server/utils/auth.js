const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username }) {
    const payload = { username };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, _id }) {
    const payload = { username, userId: _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

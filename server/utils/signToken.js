const jwt = require('jsonwebtoken');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SALT);

module.exports = signToken;

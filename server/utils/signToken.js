const jwt = require('jsonwebtoken');

const signToken = gameId =>
  jwt.sign({ gameId }, process.env.JWT_SALT);

module.exports = signToken;

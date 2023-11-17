const jwt = require('jsonwebtoken');
const signToken = payload =>
  jwt.sign(payload, process.env.JWT_SALT);

module.exports = signToken;

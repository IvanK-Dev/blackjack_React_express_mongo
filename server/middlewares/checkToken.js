const { catchAsync, AppError, clearToken } = require('../utils');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

exports.checkToken = catchAsync((req, _, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new AppError(401, 'Unauthorized -  Token is missing'));
  }
  const cleanToken = clearToken(token);

  jwt.verify(cleanToken, process.env.JWT_SALT, (err) => {
    if (err) {
      return next(new AppError(401, 'Unauthorized - Invalid token'));
    }
    next();
  });
});

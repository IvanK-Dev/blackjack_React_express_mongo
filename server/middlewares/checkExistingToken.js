const { catchAsync, AppError } = require('../utils');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

exports.checkExistingToken = catchAsync((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next();
  }

  const cleanToken = clearToken(token)
  const params = req.params;


  jwt.verify(cleanToken, process.env.JWT_SALT, (err, decoded) => {
    if (err) {
      return next();
    }

    if (params.gameId === decoded.gameId) {
      return next(new AppError(403, 'Player is already exist'));
    }

    next();
  });
});

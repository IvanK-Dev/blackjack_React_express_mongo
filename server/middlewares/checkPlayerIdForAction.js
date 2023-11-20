const { catchAsync, AppError, clearToken } = require('../utils');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

exports.checkPlayerIdForAction = catchAsync(async (req, _, next) => {
  const cleanToken = clearToken(req.headers.authorization);

  const { gameId, playerId } = jwt.decode(cleanToken, process.env.JWT_SALT);
  const { playerIdMove } = await Game.findOne({ gameId });

  console.log('playerIdMove', playerIdMove);
  console.log('playerId', playerId);

  if (playerIdMove === playerId) next();

  next(new AppError(403, "it's not your turn now"));
});

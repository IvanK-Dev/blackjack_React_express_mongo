const Game = require('../models/game/gameModel');
const { catchAsync, AppError } = require('../utils');
require('dotenv').config({ path: './.env' });

exports.checkPlayersCuontity = catchAsync(async (req, res, next) => {
  const gameId = req.params.gameId;
  const game = await Game.findOne({ gameId });

  if (game.players.length < 4) return next();
  
  next(new AppError(403, `The game:${gameId} is full`));
});

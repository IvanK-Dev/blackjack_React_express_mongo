const { sign } = require('jsonwebtoken');
const Game = require('../../models/gameModel');
const { catchAsync, signToken } = require('../../utils');

exports.getGameById = catchAsync(async (req, res) => {
  const { gameId } = req.query;
  const game = await Game.find({gameId:`${gameId}`});
  const gameToken=signToken(gameId)

  res.status(200).json({ game: game ,token:gameToken});
});

const Game = require('../../models/game/gameModel');
const { catchAsync } = require('../../utils');

exports.getAllGames = catchAsync(async (req, res) => {
  const games = await Game.find({});
  res.status(200).json({
    games: games,
  });
});

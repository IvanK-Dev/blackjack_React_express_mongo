const Game = require('../../models/game/gameModel');
const { catchAsync } = require('../../utils');

exports.getAllPlayers = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const game = await Game.findOne({gameId});
  res.status(200).json({
    players: game.players,
  });
});
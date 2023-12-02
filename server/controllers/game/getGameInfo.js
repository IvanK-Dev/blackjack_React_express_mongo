const Game = require('../../models/game/gameModel');
const { catchAsync } = require('../../utils');

exports.getGameInfo = catchAsync(async (req, res) => {
  const { gameId} = req.params;

  const game = await Game.findOne({ gameId });

  res.status(200).json({
    playerIdMove:game.playerIdMove,
    gameId:game.gameId,
    dealer:game.dealer,
    endGame:game.endGame,
  });
});

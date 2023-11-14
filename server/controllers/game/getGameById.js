const Game = require('../../models/gameModel');
const { catchAsync } = require('../../utils');

exports.getGameById = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const game = await Game.find({gameId:`${gameId}`});

  res.status(200).json({ game: game });
});

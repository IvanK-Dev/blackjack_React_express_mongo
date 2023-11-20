const Game = require('../../models/game/gameModel');
const { catchAsync, signToken } = require('../../utils');

exports.createGame = catchAsync(async (req, res) => {
  const { gameId, dealer ,playerIdMove} = await Game.create({
    endGame: false,
  });


  res.status(201).json({
    gameId,
    playerIdMove,
    dealer,
  });
});

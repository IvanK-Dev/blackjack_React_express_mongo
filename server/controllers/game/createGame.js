const Game = require('../../models/game/gameModel');
const { catchAsync, signToken } = require('../../utils');

exports.createGame = catchAsync(async (req, res) => {
  const { gameId,dealer/*, players, dealer*/ } = await Game.create({
    endGame: false,
  });

  //const player = players[0];
  //const playerToken = signToken({ gameId, playerId:player.playerId});

  res.status(201).json({
    gameId,
    // player,
    // playerToken,
     dealer,
  });
});

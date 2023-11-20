const Game = require('../../models/game/gameModel');
const jwt = require('jsonwebtoken');
const { catchAsync, clearToken, chooseNextPlayer } = require('../../utils');

exports.setPlayerStopped = catchAsync(async (req, res) => {
  const cleanToken = clearToken(req.headers.authorization);

  const { gameId, playerId } = jwt.decode(cleanToken);

  console.log('gameId', gameId);
  console.log('playerId', playerId);

  const {players, playerIdMove } = await Game.findOne({ gameId });

  const updatedGame = await Game.findOneAndUpdate(
    { gameId, 'players.playerId': playerId },
    {
      $set: {
        'players.$.stopped': true,
      },
      playerIdMove: chooseNextPlayer(players, playerIdMove),
    },
    { new: true }
  );

  res.status(200).json({
    game: updatedGame,
  });
});

const Game = require('../../models/game/gameModel');
const { catchAsync, signToken } = require('../../utils');
const createPlayer = require('../../utils/createPlayer');

exports.setPlayerinGame = catchAsync(async (req, res) => {
  const { gameId } = req.params;

  const { deck, players } = await Game.findOne({ gameId });

  const { playerId, playerHand } = createPlayer(players, deck);

  const playerToken = signToken({ gameId, playerId });

  await Game.findOneAndUpdate(
    { gameId },
    {
      $push: {
        players: {
          playerId,
          hand: playerHand,
        },
      },
    },
    { new: true }
  );

  res.status(200).json({
    gameId,
    playerToken,
    playerId
  });
});

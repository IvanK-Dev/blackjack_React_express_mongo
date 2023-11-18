const Game = require('../../models/game/gameModel');
const { catchAsync, signToken } = require('../../utils');
const createPlayer = require('../../utils/createPlayer');

exports.setPlayerinGame = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const { deck, players } = await Game.findOne({ gameId });
  const player = createPlayer(players, deck);
  const { playerId, playerHand } = player;
  const playerToken = signToken({ gameId, playerId });
  
  await Game.updateOne(
    { gameId },
    {
      $push: {
        players: {
          playerId,
          hand: playerHand,
        },
      },
    }
  );
  res.status(200).json({
    playerToken,
    playerHand,
  });
});

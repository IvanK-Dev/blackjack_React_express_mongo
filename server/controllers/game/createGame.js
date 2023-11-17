const Game = require('../../models/game/gameModel');
const BlackJackGameFactory = require('../../services/BlackJackGameFactory');
const { catchAsync, signToken } = require('../../utils');
const { nanoid } = require('nanoid');
const createPlayer = require('../../utils/createPlayer');

exports.createGame = catchAsync(async (req, res) => {
  const { id, deck } = new BlackJackGameFactory();
  const { playerId, playerHand } = createPlayer([], deck);
  const playerToken = signToken({ gameId: id, playerId });

  const { gameId } = await Game.create({
    deck,
    gameId: id,
    players: [{ playerId }],
    endGame: false,
  });

  res.status(201).json({
    gameId,
    playerToken,
    playerHand,
  });
});

const Game = require('../../models/game/gameModel');
const jwt = require('jsonwebtoken');
const { catchAsync, dealCardFromDeck, clearToken } = require('../../utils');
const calculateHand = require('../../services/calculateHand');

exports.getCardFromDeck = catchAsync(async (req, res) => {
  const gameId = req.params.gameId;
  const cleanToken = clearToken(req.headers.authorization);

  const { playerId } = jwt.decode(cleanToken);

  const game = await Game.findOne({ gameId });

  const deck = game.deck;

  const newCard = dealCardFromDeck(deck, 1);

  const updatedGame = await Game.findOneAndUpdate(
    { gameId, 'players.playerId': playerId },
    {
      $push: { 'players.$.hand': { $each: newCard } },
      $set: { deck },
    },
    {
      new: true,
    }
  ).exec();

  const player = updatedGame.players.find((item) => item.playerId === playerId);

  player.score = calculateHand(player.hand);

  const updatedPlayer = await Game.findOneAndUpdate(
    { gameId, 'players.playerId': playerId },
    {
      $push: { 'players.$.hand': { $each: newCard } },
      $set: { deck },
      $set: {
        'players.$.score': calculateHand([
          ...game.players.find((p) => p.playerId === playerId).hand,
          ...newCard,
        ]),
      },
    },
    {
      new: true,
    }
  ).then((data) => data.players.at(playerId - 1));


  res.status(200).json({ newCard, player: updatedPlayer });
});

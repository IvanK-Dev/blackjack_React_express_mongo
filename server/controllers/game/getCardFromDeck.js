const Game = require('../../models/game/gameModel');
const jwt = require('jsonwebtoken');
const {
  catchAsync,
  dealCardFromDeck,
  clearToken,
  chooseNextPlayer,
} = require('../../utils');
const calculateHand = require('../../services/calculateHand');

exports.getCardFromDeck = catchAsync(async (req, res) => {
  const gameId = req.params.gameId;
  const cleanToken = clearToken(req.headers.authorization);

  const { playerId } = jwt.decode(cleanToken);

  const game = await Game.findOne({ gameId });

  const { deck, playerIdMove, players } = game;

  const newPlayerIdMove = chooseNextPlayer(players, playerIdMove);

  const newCard = dealCardFromDeck(deck, 1);

  const playerToUpdate = game.players.find((p) => p.playerId === playerId);

  const updatedScore = calculateHand([...playerToUpdate.hand, ...newCard]);

  // Проверяем, если после взятия карты счет стал больше или равен 21, устанавливаем stopped в true
  const stopped = updatedScore >= 21;

  const updatedGame = await Game.findOneAndUpdate(
    { gameId, 'players.playerId': playerId },
    {
      $push: { 'players.$.hand': { $each: newCard } },
      $set: {
        playerIdMove: newPlayerIdMove,
        deck,
        'players.$.score': updatedScore,
        'players.$.stopped': stopped,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ game: updatedGame });
});

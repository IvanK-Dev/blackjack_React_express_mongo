const Game = require('../../models/game/gameModel');
const jwt = require('jsonwebtoken');
const {
  catchAsync,
  dealCardFromDeck,
  clearToken,
  chooseNextPlayer,
} = require('../../utils');
const calculateHand = require('../../services/calculateHand');

exports.dealerGetCard = catchAsync(async (req, res) => {
  const gameId = req.params.gameId;
  const { deck, dealer } = await Game.findOne({ gameId });

  const newCard = dealCardFromDeck(deck, 1);

  const updatedScore = calculateHand([...dealer.hand, ...newCard]);

  // Проверяем, если после взятия карты счет стал больше или равен 21, устанавливаем stopped в true
  const stopped = updatedScore >= 21;

  const updatedGame = await Game.findOneAndUpdate(
    { gameId },
    {
      $push: { 'dealer.hand': { $each: newCard } },
      $set: {
        deck,
        'dealer.stopped': stopped,
      },
    },
    {
      new: true,
    }
  );

  return res.status(200).json({ game: updatedGame });
});

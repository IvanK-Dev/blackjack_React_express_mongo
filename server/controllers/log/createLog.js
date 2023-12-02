const Game = require('../../models/game/gameModel');
const Loger = require('../../models/game/logerModel');
const { catchAsync } = require('../../utils');

exports.createLog = catchAsync(async (req, res) => {
  const { gameId } = req.params;

  const game = await Game.findOne({ gameId });

  
  const dealerHandLog = `Create dealer Hand: ${game.dealer.hand.join(', ')}`;

  await Loger.create({
    gameId:game.gameId,
    log: [dealerHandLog] ,
  });

  res.status(200).json({ status: 'success' });
});

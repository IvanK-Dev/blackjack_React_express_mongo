const Loger = require('../../models/game/logerModel');
const { catchAsync } = require('../../utils');

exports.createPlayerLog = catchAsync(async (req, res) => {
  const { gameId } = req.params;
  const { playerId, hand } = req.body;

  console.log('playerId, hand',playerId, hand)
  const playerHandLog = `Create player${playerId} Hand: ${hand.join(', ')}`;

  await Loger.findOneAndUpdate(
    { gameId },
    { $push: { log: playerHandLog } },
    { new: true } 
  );

  res.status(200).json({ status: 'success' });
});

const Game = require('../../models/gameModel');
const { catchAsync } = require('../../utils');
const { nanoid } = require('nanoid');

exports.createGame = catchAsync(async (req, res) => {
  const gameId = nanoid(10);
  const game = await Game.create({
    gameId,
  });
  res.status(201).json({ gameId: gameId, message: `game: ${game} created` });
});

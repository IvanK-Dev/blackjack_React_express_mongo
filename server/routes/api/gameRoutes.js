const { Router } = require('express');
const {
  getAllGames,
  createGame,
  getGameById,
} = require('../../controllers/game');

const router = Router();
router.route('/').get(getAllGames);
router.route('/create').get(createGame);
router.route('/:gameId').get(getGameById);

module.exports = router;

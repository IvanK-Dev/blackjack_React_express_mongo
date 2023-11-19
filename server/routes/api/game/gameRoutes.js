const { Router } = require('express');
const {
  getAllGames,
  createGame,
  setPlayerinGame,
  getCardFromDeck,
  setPlayerStopped,
  getAllPlayers,
} = require('../../../controllers/game');
const {
  checkToken,
  checkExistingToken,
  checkPlayersCuontity,
} = require('../../../middlewares');

const router = Router();
router.route('/').get(getAllGames);
router.route('/create').get(createGame);
router.route('/:gameId/getAllPlayers').get(checkToken, getAllPlayers);

router.route('/:gameId/getCard').get(checkToken, getCardFromDeck);

router.route('/:gameId/playerStop').get(checkToken, setPlayerStopped);

router
  .route('/:gameId')
  .get(checkExistingToken, checkPlayersCuontity, setPlayerinGame);

module.exports = router;

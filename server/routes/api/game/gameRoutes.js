const { Router } = require('express');
const {
  getAllGames,
  createGame,
  setPlayerinGame,
  getCardFromDeck,
  setPlayerStopped,
  getAllPlayers,
  getGameInfo,
  dealerGetCard,
} = require('../../../controllers/game');
const {
  checkToken,
  checkExistingToken,
  checkPlayersCuontity,
} = require('../../../middlewares');
const { checkPlayerIdForAction } = require('../../../middlewares/checkPlayerIdForAction');

const router = Router();
router.route('/').get(getAllGames);
router.route('/create').get(createGame);
router.route('/:gameId/getAllPlayers').get(checkToken, getAllPlayers);

router.route('/:gameId/getCard').get(checkToken,checkPlayerIdForAction, getCardFromDeck);
router.route('/:gameId/dealerGetCard').get(dealerGetCard);

router.route('/:gameId/playerStop').get(checkToken,checkPlayerIdForAction, setPlayerStopped);

router
  .route('/:gameId/createPlayer')
  .get(checkExistingToken, checkPlayersCuontity, setPlayerinGame);

  router.route('/:gameId').get(getGameInfo);


module.exports = router;

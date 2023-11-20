const { createGame } = require('./createGame');
const { getAllGames } = require('./getAllGames');
const { getAllPlayers } = require('./getAllPlayers');
const { getCardFromDeck } = require('./getCardFromDeck');
const { getGameInfo } = require('./getGameInfo');
const { setPlayerStopped } = require('./setPlayerStopped');
const { setPlayerinGame } = require('./setPlayerinGame');

module.exports = {
  createGame,
  getAllGames,
  setPlayerinGame,
  getCardFromDeck,
  setPlayerStopped,
  getAllPlayers,
  getGameInfo,
};

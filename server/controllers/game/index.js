const { createGame } = require('./createGame');
const { getAllGames } = require('./getAllGames');
const { getAllPlayers } = require('./getAllPlayers');
const { getCardFromDeck } = require('./getCardFromDeck');
const { setPlayerStopped } = require('./setPlayerStopped');
const { setPlayerinGame } = require('./setPlayerinGame');
getAllPlayers
module.exports = {
  createGame,
  getAllGames,
  setPlayerinGame,
  getCardFromDeck,
  setPlayerStopped,
  getAllPlayers,
};

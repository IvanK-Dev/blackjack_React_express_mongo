const chooseNextPlayer = (players, playerIdMove) =>
  players.length > playerIdMove ? playerIdMove + 1 : 1;

module.exports = chooseNextPlayer;

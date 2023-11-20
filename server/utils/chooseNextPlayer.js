const chooseNextPlayer = (players, playerIdMove) =>
  players.length < playerIdMove ? playerIdMove++ : (playerIdMove = 1);

module.exports=chooseNextPlayer
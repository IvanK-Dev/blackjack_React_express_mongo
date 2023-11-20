const dealCardFromDeck = require('./dealCardFromDeck');

module.exports = createPlayer = (players, deck) => {

  const playerId = players.length + 1;
  const playerHand = dealCardFromDeck(deck,2);

  return { playerId, playerHand,newDeck:deck };
};

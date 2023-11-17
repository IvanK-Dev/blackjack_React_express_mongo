module.exports = createPlayer = (players, deck) => {
  if (players.length > 4) return null;
  const playerId = players.length + 1;

  const playerHand = deck.slice(-2);

  deck.splice(-2);

  return { playerId, playerHand };
};

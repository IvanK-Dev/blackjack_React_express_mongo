module.exports = dealCardFromDeck = (deck, quantity) => {
  const hand = deck.slice(-quantity);
  deck.splice(-quantity);

  return hand;
};

const { CARD_SUITS, CARD_VALUES } = require('../constants');

class BlackJackGameFactory {
  constructor() {
    this.deck = [];
    this.createDeck();
    this.shuffleDeck();
  }

  /**
   * Создает колоду карт.
   */
  createDeck() {
    for (let suit of CARD_SUITS) {
      for (let value of CARD_VALUES) {
        this.deck.push(`${suit}_${value}`);
      }
    }
  }

  /**
   * Тасует колоду карт.
   */
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}

module.exports = BlackJackGameFactory;

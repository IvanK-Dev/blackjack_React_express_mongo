import { CARD_SUITS } from '../constants/cardSuits';
import { CARD_VALUES } from '../constants/cardValues';
import BotPlayerFactory from './BotPlayerFactory';
import DealerFactory from './DealerFactory';
import PlayerFactory from './PlayerFactory';

/**
 * Фабрика для создания и управления игрой в Блэкджек.
 * @class
 * @param {number} playerCount - Количество игроков (по умолчанию 1).
 */
class BlackJackGameFactory {
  constructor(playerCount = 1) {
    /** @type {string[]} deck - Колода карт */
    this.deck = [];
    /** @type {Player[]} players - Массив игроков */
    this.players = [];
    /** @type {number} playerCount - Количество игроков */
    this.playerCount = playerCount;
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

  /**
   * Выдает карту из колоды.
   * @returns {string} - Последняя карта из колоды.
   */
  dealCard = () => this.deck.pop();

  /**
   * Сбрасывает состояние игры.
   */
  resetGame = () => {
    this.players.forEach((player) => {
      player.hand = [];
      player.score = 0;
      player.stopped = false;
      player.buttonsDisabled = true;
    });
  };

  /**
   * Начинает новую игру, создает колоду, тасует ее и раздает карты игрокам.
   */
  startGame() {
    this.deck = [];
    this.createDeck();
    this.shuffleDeck();

    this.endGame = false;

    /**
     * Раздает начальные карты участнику.
     * @param {Object} participant - Игрок или дилер.
     */
    const firstDeal = (participant) => {
      const cardCount = 2;
      for (let i = 0; i < cardCount; i++) {
        participant.dealCard(this.deck);
      }
    };
    /**
     * Раздает и вычисляет счет карт для массива игроков.
     * @param {Object[]} playersArray - Массив игроков.
     */
    const dealAndCalculateScore = (playersArray) => {
      for (const participant of playersArray) {
        firstDeal(participant);
        participant.calculateHand();
      }
    };
    // Если массив игроков пуст, создаем новых игроков и дилера
    if (this.players.length === 0) {
      for (let i = 0; i < 4; i++) {
        const player =
          i < this.playerCount ? new PlayerFactory() : new BotPlayerFactory();
        this.players.push(player);
      }

      const dealer = new DealerFactory();
      this.players.push(dealer);
    }
    // Раздаем карты и вычисляем счет для игроков
    dealAndCalculateScore(this.players);
  }
}

export default BlackJackGameFactory;

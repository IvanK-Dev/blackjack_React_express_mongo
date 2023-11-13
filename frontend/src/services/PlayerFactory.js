/**
 * Класс Player представляет игрока в игре Blackjack.
 */
class PlayerFactory {
  static #id = 0;
  constructor() {
    PlayerFactory.#id++;
    this.id = PlayerFactory.#id;
    this.hand = [];
    this.score = 0;
    this.stopped = false;
    this.buttonsDisabled = false;
  }

  buttonsDisabledToggle = () => (this.buttonsDisabled = !this.buttonsDisabled);

  /**
   * Создает элемент для отображения игрока.
   * @returns {HTMLElement} - Элемент, представляющий игрока.
   */
  /**
   * Устанавливает флаг остановки игрока.
   */
  setStopped = () => (this.stopped = true);

  /**
   * Метод раздачи карты игроку.
   * @param {string[]} deck - Колода карт.
   * @returns {string} - Возвращает последнюю карту из колоды.
   */
  dealCard = (deck) => {
    this.hand.push(deck.pop());
  };

  /**
   * Метод вычисления очков на руке игрока.
   */
  calculateHand = () => {
    let score = 0;
    let hasAce = false;
    for (let card of this.hand) {
      const value = card.split('_')[1];
      switch (value) {
        case 'A':
          hasAce = true;
          score += 11;
          break;
        case 'K':
        case 'Q':
        case 'J':
          score += 10;
          break;
        default:
          score += parseInt(value, 10);
          break;
      }
    }

    if (hasAce && score > 21) {
      score -= 10;
    }

    this.score = score;
  };
}

export default PlayerFactory;

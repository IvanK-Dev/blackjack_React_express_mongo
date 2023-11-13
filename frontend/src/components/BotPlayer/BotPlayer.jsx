import CardsList from '../CardsList/CardsList';

/**
 * Компонент, представляющий игрока-бота.
 * @component
 * @param {Object} player - Информация о боте.
 * @param {string} player.id - Идентификатор бота.
 * @param {Array} player.hand - Карты в руке бота.
 * @param {number} player.score - Очки бота.
 */
const BotPlayer = ({ player: { id, hand, score } }) => {
  return (
    <div id={`player-${id}-area`} className="player-area area">
      <h2>{`Игрок ${id}`}</h2>
      <div id={`player-${id}-hand`} className="hand">
        <CardsList cards={hand} />
      </div>
      <p id={`player-${id}-score`} className="score">
        Очки: {score}
      </p>
    </div>
  );
};

export default BotPlayer;

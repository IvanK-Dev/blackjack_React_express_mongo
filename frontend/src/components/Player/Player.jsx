import PlayerButtons from './PlayerButtons/PlayerButtons';
import CardsList from '../CardsList/CardsList';

/**
 * Компонент, представляющий игрока.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.player - Информация о текущем игроке.
 */
const Player = ({ player }) => {
  // Извлечение необходимых данных из объекта игрока
  const { id, hand, score } = player;

  return (
    <div id={`player-${id}-area`} className={'player-area area'}>
      <h2>{`Игрок ${id}`}</h2>
      <div id={`player-${id}-hand`} className={'hand'}>
        <CardsList cards={hand} />
      </div>
      <p id={`player-${id}-score`} className={'score'}>
        Очки: {score}
      </p>
      <PlayerButtons player={player} />
    </div>
  );
};

export default Player;

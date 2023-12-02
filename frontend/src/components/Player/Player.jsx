import PlayerButtons from './PlayerButtons/PlayerButtons';
import CardsList from '../CardsList/CardsList';
import { selectPlayerIdMove } from '../../redux/game/gameSelectors';
import { useSelector } from 'react-redux';
import { selectPlayerId } from '../../redux/players/playersSelectors';

/**
 * Компонент, представляющий игрока.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.player - Информация о текущем игроке.
 */
const Player = ({ player }) => {
  const playerIdScreen = useSelector(selectPlayerId);

  // Извлечение необходимых данных из объекта игрока
  const { playerId, hand, score } = player;

  return (
    <div id={`player-${playerId}-area`} className={'player-area area'}>
      <h2>{`Игрок ${playerId}`}</h2>
      <div id={`player-${playerId}-hand`} className={'hand'}>
        <CardsList cards={hand} />
      </div>
      <p id={`player-${playerId}-score`} className={'score'}>
        Очки: {score}
      </p>
      {playerId === playerIdScreen && <PlayerButtons player={player} />}
    </div>
  );
};

export default Player;

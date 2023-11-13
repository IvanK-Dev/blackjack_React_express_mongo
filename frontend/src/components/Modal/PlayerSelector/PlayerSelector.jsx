import { useGame } from '../../../context/gameContext';
import css from './PlayerSelector.module.css';

/**
 * Компонент выбора количества игроков перед началом игры.
 * @component
 */
const PlayerSelector = () => {
  const { playerCount, setPlayerCount } = useGame();

  // Генерация вариантов выбора количества игроков
  const options = [];
  for (let i = 1; i <= 4; i++) {
    options.push(
      <option key={i} value={i}>
        {`${i} игрок${i === 1 ? '' : 'а'}`}
      </option>
    );
  }

  // Обработчик изменения количества игроков
  const handlePlayerCountChange = (evt) => {
    setPlayerCount(parseInt(evt.target.value, 10));
  };

  return (
    <div className={css.playerCount}>
      <p className={css.status}>
        Выберите количество игроков и нажмите "Начать игру".
      </p>
      <label htmlFor="playerSelect">Количество игроков: </label>
      <select
        id="playerSelect"
        className={css.playerSelect}
        value={playerCount}
        onChange={handlePlayerCountChange}
      >
        {options}
      </select>
    </div>
  );
};

export default PlayerSelector;

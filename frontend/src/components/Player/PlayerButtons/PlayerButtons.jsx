import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPlayersThunk,
  getCardThunk,
  setPlayerStopped,
} from '../../../redux/players/playersThunk';
import { selectGameId } from '../../../redux/game/gameSelectors';
import { token } from '../../../http';
import { selectorPlayerToken } from '../../../redux/players/playersSelectors';

/**
 * Компонент кнопок для игрока.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.player - Информация о текущем игроке.
 */
const PlayerButtons = ({ player }) => {
  const dispatch = useDispatch();
  const gameId = useSelector(selectGameId);
  const playerToken = useSelector(selectorPlayerToken);

  // Информация о кнопках
  const buttonsInfo = [
    { text: 'Взять', id: `hitButton` },
    { text: 'Стоп', id: `stopButton` },
  ];

  // Обработчик клика по кнопке
  const handleButtonClick = (evt) => {
    switch (evt.target.id) {
      case buttonsInfo.at(0).id:
        dispatch(getCardThunk(gameId));
        break;
      case buttonsInfo.at(1).id:
        dispatch(setPlayerStopped(gameId));
        break;

      default:
        break;
    }
  };



  return (
    <ul className={'player-button-list'}>
      {buttonsInfo.map(({ text, id }) => (
        <li key={`${id}${text}`}>
          <button
            type="button"
            id={id}
            onClick={handleButtonClick}
             disabled={player.stopped}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PlayerButtons;

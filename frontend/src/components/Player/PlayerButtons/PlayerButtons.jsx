import { useDispatch, useSelector } from 'react-redux';
import {
  getCardThunk,
  setPlayerStopped,
} from '../../../redux/players/playersThunk';
import {
  selectGameId,
  selectPlayerIdMove,
} from '../../../redux/game/gameSelectors';
import { useCallback } from 'react';

/**
 * Компонент кнопок для игрока.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.player - Информация о текущем игроке.
 */
const PlayerButtons = ({ player }) => {
  const dispatch = useDispatch();
  const gameId = useSelector(selectGameId);
  const playerIdMove = useSelector(selectPlayerIdMove);
  const { playerId } = player;

  // Информация о кнопках
  const buttonsInfo = [
    { text: 'Взять', id: `hitButton` },
    { text: 'Стоп', id: `stopButton` },
  ];

  // Обработчик клика по кнопке
  const handleButtonClick =useCallback( (evt) => {
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
  },[dispatch]);

  return (
    <ul className={'player-button-list'}>
      {buttonsInfo.map(({ text, id }) => (
        <li key={`${id}${text}`}>
          <button
            type="button"
            id={id}
            onClick={handleButtonClick}
            disabled={!(playerId === playerIdMove && !player.stopped)}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PlayerButtons;

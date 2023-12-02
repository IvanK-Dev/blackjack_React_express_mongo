import { useCallback, useEffect } from 'react';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayersArr,
  selectPlayerStatus,
  selectPlayerToken,
} from '../../redux/players/playersSelectors';
import {
  selectGameDealer,
  selectGameId,
} from '../../redux/game/gameSelectors';
import { getAllPlayersThunk } from '../../redux/players/playersThunk';
import { token } from '../../http';
import Loader from '../Loader/Loader';
import { STATUS } from '../../constants/status';
import {
  getGameInfoThunk,
} from '../../redux/game/gameThunk';

/**
 * Компонент, представляющий игру BlackJack.
 * @component
 * @example
 * // Пример использования:
 * // <BlackJackGame initialPlayerCount={4} onEndGame={handleEndGame} />
 * @param {object} props - Свойства компонента.
 * @param {number} props.initialPlayerCount - Начальное количество игроков.
 * @param {Function} props.onEndGame - Callback-функция, вызываемая при завершении игры.
 * @returns {JSX.Element} Элемент компонента BlackJackGame.
 */
const BlackJackGame = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersArr);
  const dealer = useSelector(selectGameDealer);
  const gameId = useSelector(selectGameId);
  const playerToken = useSelector(selectPlayerToken);
  const playersStatus = useSelector(selectPlayerStatus);

  /**
   * Функция для получения данных игры.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchData =useCallback( async () => {
    token.set(playerToken);
    dispatch(getAllPlayersThunk(gameId));
    await dispatch(getGameInfoThunk(gameId)).unwrap();
  },[dispatch,playerToken,gameId]);

  useEffect(() => {

    fetchData();
  }, [dispatch, gameId, playerToken]);

  // Если данные о игроках загружаются, отображается индикатор загрузки
  if (!players || playersStatus === STATUS.loading) return <Loader />;

  return (
    // Отрисовка компонента, если есть игроки
    players && (
      <div id="game">
        <div className="box">
          <Dealer participant={dealer} />
          <div id="players-area">
            {players.map((player) => {
              return <Player key={player.playerId} player={player} />;
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default BlackJackGame;

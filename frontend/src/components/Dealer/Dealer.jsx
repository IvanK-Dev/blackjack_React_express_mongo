import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../CardsList/CardsList';
import { useCallback, useEffect } from 'react';
import {
  dealerGetCardThunk,
  getGameInfoThunk,
} from '../../redux/game/gameThunk';
import { selectPlayersArr } from '../../redux/players/playersSelectors';
import { selectGameDealer, selectGameId } from '../../redux/game/gameSelectors';

/**
 * Компонент, представляющий дилера в игре BlackJack.
 * @component
 * @returns {JSX.Element|null} Элемент компонента Dealer или null, если информация о руке дилера отсутствует.
 */
const Dealer = () => {
  const players = useSelector(selectPlayersArr);
  const gameId = useSelector(selectGameId);
  const { hand, score, stopped } = useSelector(selectGameDealer);
  const dispatch = useDispatch();

  /**
   * Функция определения видимости счета дилера в зависимости от количества карт в руке.
   * @function
   * @returns {string} Видимость счета (visible или hidden).
   */
  const scoreVisibility = () => (hand.length > 2 ? 'visible' : 'hidden');

  /**
   * Функция для получения карты дилера и обновления информации о текущей игре.
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchData = useCallback(async () => {
    await dispatch(dealerGetCardThunk(gameId)).unwrap();
    await dispatch(getGameInfoThunk(gameId)).unwrap();
  }, [dispatch,gameId]);

  useEffect(() => {
    /**
     * Проверка и запуск получения карты дилера, если все игроки остановились и дилер не остановился.
     * @function
     * @returns {void}
     */
    const checkAndFetchData = () => {
      if (!stopped && players.length && players.every((player) => player.stopped)) {
        const timeoutId = setTimeout(() => {
          fetchData();
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    };

    checkAndFetchData();
  }, [dispatch, gameId, stopped, players, hand, fetchData]);

  // Если информация о руке дилера доступна, отрисовываем компонент
  return (
    hand && (
      <div id="dealer-area" className="area">
        <h2>Дилер</h2>
        <div id="dealer-hand" className="hand">
          <CardsList cards={hand} />
        </div>
        <p
          id="dealer-score"
          className="score"
          style={{ visibility: scoreVisibility() }}
        >
          Очки: {score}
        </p>
      </div>
    )
  );
};

export default Dealer;

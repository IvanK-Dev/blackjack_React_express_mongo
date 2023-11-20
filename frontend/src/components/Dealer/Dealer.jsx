import { useDispatch, useSelector } from 'react-redux';
import CardsList from '../CardsList/CardsList';
import { useEffect } from 'react';
import { dealerGetCardThunk } from '../../redux/game/gameThunk';
import { selectPlayersArr } from '../../redux/players/playersSelectors';
import { selectGameId } from '../../redux/game/gameSelectors';

/**
 * Компонент, представляющий дилера в игре.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.participant - Информация о дилере.
 * @param {Array} props.participant.hand - Карты в руке дилера.
 * @param {number} props.participant.score - Очки дилера.
 * @param {boolean} props.participant.visibleScore - Видимость счета дилера.
 */
const Dealer = ({ participant: { hand, score, stopped } }) => {
  const players = useSelector(selectPlayersArr);
  const gameId = useSelector(selectGameId);
  const dispatch = useDispatch();


  const scoreVisibility = () => (stopped ? 'visible' : 'hidden');

  useEffect(() => {
    const fetchData = async () => {
      // Вызываем действие для дилера, чтобы он взял карту
      dispatch(dealerGetCardThunk(gameId));
    };

    // Проверяем, все ли игроки остановились, и дилер не остановился
    if (!stopped && players.every((player) => player.stopped)) fetchData();

  }, [dispatch, gameId, stopped, players]);

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

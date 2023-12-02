import { useSelector } from 'react-redux';
import { selectPlayersArr } from '../../../redux/players/playersSelectors';
import { selectGameDealer } from '../../../redux/game/gameSelectors';

const WinnersElement = () => {
  const players = useSelector(selectPlayersArr);
  const dealer = useSelector(selectGameDealer);
  // Фильтрация игроков с количеством очков <= 21
  let filteredPlayers = players.filter((player) => player.score <= 21);

  // Поиск максимального количества очков среди игроков
  const winScore = Math.max(...filteredPlayers.map(({ score }) => score));

  // Фильтрация игроков с количеством очков, равным максимальному
  filteredPlayers = players.filter((player) => player.score === winScore);

  const winPlayersArr = filteredPlayers.map(({ playerId, score }) => (
    <p key={playerId}>
      Игрок {playerId} выиграл. Очки: {score}
    </p>
  ));

  if (dealer.score <= 21 && dealer.score >= winScore) {
    return (
      <div className="winners">
        <p> Диллер выиграл. Очки: {dealer.score}</p>
        {dealer.score === winScore && winPlayersArr}
      </div>
    );
  }

  return <div className="winners">{winPlayersArr}</div>;
};

export default WinnersElement;

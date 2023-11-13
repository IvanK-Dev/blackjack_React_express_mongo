import DealerFactory from '../../../services/DealerFactory';

const WinnersElement = ({ players }) => {
  // Фильтрация игроков с количеством очков <= 21
  let filteredPlayers = players.filter((player) => player.score <= 21);

  // Поиск максимального количества очков среди игроков
  const winScore = Math.max(...filteredPlayers.map(({ score }) => score));

  // Фильтрация игроков с количеством очков, равным максимальному
  filteredPlayers = players.filter((player) => player.score === winScore);

  return (
    <div className="winners">
      {filteredPlayers.map((player) => (
        <p key={player.id}>
          {player instanceof DealerFactory
            ? `Диллер выиграл. Очки: ${player.score}`
            : `Игрок ${player.id} выиграл. Очки: ${player.score}`}
        </p>
      ))}
    </div>
  );
};

export default WinnersElement;

// import Dealer from '../Dealer.js';

// /**
//  * Компонент отображения победителей после завершения игры.
//  * @component
//  * @param {Object} props - Свойства компонента.
//  * @param {Object} props.game - Информация о текущей игре.
//  */
// const ShowWinners = ({ game }) => {
//   // Фильтрация игроков с суммой очков не превышающей 21
//   const players = game.players.filter((player) => player.score <= 21);

//   // Поиск максимальной суммы очков среди игроков
//   const winScore = Math.max(...players.map(({ score }) => score));

//   // Фильтрация игроков с максимальной суммой очков (победителей)
//   const winners = players.filter((player) => player.score === winScore);

//   // Функция для отображения информации о победителе
//   const displayWinner = (player) => {
//     if (player instanceof Dealer) {
//       // Отображение информации о победе дилера
//       return <p key={player.id}>Диллер выиграл. Очки: {player.score}</p>;
//     } else {
//       return (
//         // Отображение информации о победе игрока
//         <p key={player.id}>
//           Игрок {player.id} выиграл. Очки: {player.score}
//         </p>
//       );
//     }
//   };

//   return (
//     <div className="winners">
//       {winners.map((player) => displayWinner(player))}
//     </div>
//   );
// };

// export default ShowWinners;

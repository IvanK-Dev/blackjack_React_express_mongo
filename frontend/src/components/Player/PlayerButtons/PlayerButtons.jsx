import { useGame } from '../../../context/gameContext';

/**
 * Компонент кнопок для игрока.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.player - Информация о текущем игроке.
 */
const PlayerButtons = ({ player }) => {
  // Использование пользовательского хука контекста игры
  const { deck, setDeck } = useGame();

  // Информация о кнопках
  const buttonsInfo = [
    { text: 'Взять', id: `hitButton` },
    { text: 'Стоп', id: `stopButton` },
  ];

  // Обработчик клика по кнопке
  const handleButtonClick = (evt) => {
    const gameDeck = [...deck];
    switch (evt.target.id) {
      case buttonsInfo.at(0).id:
        player.dealCard(gameDeck);
        player.calculateHand();
        break;
      case buttonsInfo.at(1).id:
        player.setStopped();
        break;

      default:
        break;
    }
    // Обновление колоды в контексте игры
    setDeck(gameDeck);
  };

  // Если у игрока сумма очков больше или равна 21, он автоматически останавливается
  if (player.score >= 21) {
    player.stopped = true;
  }

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

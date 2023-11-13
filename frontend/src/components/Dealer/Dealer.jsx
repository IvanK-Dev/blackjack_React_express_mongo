import CardsList from '../CardsList/CardsList';

/**
 * Компонент, представляющий дилера в игре.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Object} props.participant - Информация о дилере.
 * @param {Array} props.participant.hand - Карты в руке дилера.
 * @param {number} props.participant.score - Очки дилера.
 * @param {boolean} props.participant.visibleScore - Видимость счета дилера.
 */
const Dealer = ({ participant: { hand, score, visibleScore } }) => {
  const scoreVisibility = () => (visibleScore ? 'visible' : 'hidden');

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
          style={{ visibility: scoreVisibility }}
        >
          Очки: {score}
        </p>
      </div>
    )
  );
};

export default Dealer;

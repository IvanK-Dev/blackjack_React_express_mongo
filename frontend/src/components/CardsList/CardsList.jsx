import Card from '../Card/Card';

/**
 * Компонент, представляющий список карт.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {Array} props.cards - Список карт для отображения.
 */
const CardsList = ({ cards }) => {
  return (
    <ul className={'cards__list'}>
      {cards.map((card) => (
        <li key={card}>{<Card cardStr={card} />}</li>
      ))}
    </ul>
  );
};

export default CardsList;

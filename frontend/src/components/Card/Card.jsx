/**
 * Компонент, представляющий отдельную карту в игре.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {string} props.cardStr - Строковое представление карты.
 */
const Card = ({ cardStr }) => {
  return (
    <div className={'card-box'}>
      <svg className={'card__image'}>
        <use href={`/assets/img/deck/deck.svg#${cardStr}`}></use>
      </svg>
    </div>
  );
};

export default Card;

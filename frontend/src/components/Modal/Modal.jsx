import { createPortal } from 'react-dom';
import useToggle from '../../hooks/useToggle.js';
import css from './Modal.module.css';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearGame } from '../../redux/game/gameSlice.js';
import { clearPlayers } from '../../redux/players/playersSlice.js';
import WinnersElement from './WinnersElement/WinnersElement.jsx';
import { useEffect } from 'react';

/**
 * Компонент модального окна.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.component - Компонент, отображаемый в модальном окне.
 * @param {string} props.buttonText - Текст кнопки в модальном окне.
 * @param {Function} props.onClick - Обработчик события клика по кнопке.
 */
const Modal = ({ onClick }) => {

  // Состояние для управления видимостью модального окна
  const [hidden, setHidden] = useState(false);

  // Хук для управления открытием/закрытием модального окна
  const { isOpen, onClose } = useToggle(true);
  const dispatch = useDispatch();

  // Обработчик клика по кнопке в модальном окне
  const handleButtonClick = useCallback(() => {
    setHidden(!hidden);
    setTimeout(() => {
      onClick();
      onClose(); // Закрытие модального окна
    }, 300); // Задержка пока отрабатывает css
  }, [onClick]);

  useEffect(() => {
    return () => {
      dispatch(clearGame());
      dispatch(clearPlayers());
    };
  }, [dispatch]);

  // Если модальное окно закрыто, не отображаем его
  if (!isOpen) return null;

  return createPortal(
    <div className={`${css.modal} ${hidden ? css.hidden : ''}`}>
      <WinnersElement />
      <button
        type="button"
        className={css.modal__button}
        onClick={handleButtonClick}
      >
        Next Game
      </button>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;

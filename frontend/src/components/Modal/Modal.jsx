import { createPortal } from 'react-dom';
import useToggle from '../../hooks/useToggle.js';
import css from './Modal.module.css';
import { useState } from 'react';
import { useGame } from '../../context/gameContext.js';

/**
 * Компонент модального окна.
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {ReactNode} props.component - Компонент, отображаемый в модальном окне.
 * @param {string} props.buttonText - Текст кнопки в модальном окне.
 * @param {Function} props.onClick - Обработчик события клика по кнопке.
 */
const Modal = ({ component, buttonText, onClick }) => {
  // Состояние для управления видимостью модального окна
  const [hidden, setHidden] = useState(false);
  // Хук для управления открытием/закрытием модального окна
  const { isOpen, onClose } = useToggle(true);
  // Использование пользовательского хука контекста игры
  const { startGame, setStartGame } = useGame();

  // Обработчик клика по кнопке в модальном окне
  const handleButtonClick = () => {
    setHidden(!hidden);
    setTimeout(() => {
      onClose(); // Закрытие модального окна
      onClick();
      setStartGame(!startGame); // Изменение статуса игры
    }, 300); // Задержка пока отрабатывает css
  };

  // Если модальное окно закрыто, не отображаем его
  if (!isOpen) return null;

  return createPortal(
    <div className={`${css.modal} ${hidden ? css.hidden : ''}`}>
      {component}
      <button
        type="button"
        className={css.modal__button}
        onClick={handleButtonClick}
      >
        {buttonText}
      </button>
    </div>,
    document.getElementById('portal-root')
  );
};

export default Modal;

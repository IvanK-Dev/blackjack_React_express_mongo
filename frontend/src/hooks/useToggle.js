import { useState } from 'react';

/**
 * Кастомный хук для управления состоянием открытия/закрытия.
 * @param {boolean} initialState - Начальное значение состояния (по умолчанию false).
 * @returns {Object} - Объект с текущим состоянием isOpen и функцией onClose.
 */
const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const onClose = () => setIsOpen(false);

  return { isOpen, onClose };
};

export default useToggle;

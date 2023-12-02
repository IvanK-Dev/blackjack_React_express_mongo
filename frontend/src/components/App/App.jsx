import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BlackJackGame from '../BlackJackGame/BlackJackGame';
import Modal from '../Modal/Modal';

import StartComponent from '../StartComponent/StartComponent';
import { useSelector } from 'react-redux';
import { selectEndGame, selectGameStart } from '../../redux/game/gameSelectors';
import Loader from '../Loader/Loader';

/**
 * Компонент приложения.
 * @component
 * @returns {JSX.Element} Элемент приложения.
 */
const App = () => {
  const [showModal, setShowModal] = useState(false);
  const gameStart = useSelector(selectGameStart);
  const endGame = useSelector(selectEndGame);
  const navigate = useNavigate();

  /**
   * Обработчик нажатия кнопки начала игры, скрывает модальное окно.
   * @function
   * @returns {void}
   */
  const handleCloseModal =useCallback( () => {
    setShowModal(false);
    navigate('/');
  },[]);

  useEffect(() => {
    // Программное перенаправление в зависимости от значения gameStart
    if (gameStart) {
      navigate('/game');
    } else {
      navigate('/');
    }
  }, [gameStart, navigate]);

  useEffect(() => {
    if (endGame) {
      setShowModal(true);
    }
  }, [endGame]);

  return (
    <>
      {showModal && <Modal onClick={handleCloseModal} />}
      <Routes>
        <Route path="/" element={!gameStart && <StartComponent />} />
        {gameStart && !endGame && (
          <Route path="/game" element={<BlackJackGame />} />
        )}
        <Route path="*" element={<Loader />} />
      </Routes>
    </>
  );
};

export default App;

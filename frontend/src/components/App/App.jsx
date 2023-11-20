import { useEffect, useState } from 'react';
import { Link, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import BlackJackGame from '../BlackJackGame/BlackJackGame';
import Modal from '../Modal/Modal';
import PlayerSelector from '../Modal/PlayerSelector/PlayerSelector';
import WinnersElement from '../Modal/WinnersElement/WinnersElement';

import StartComponent from '../StartComponent/StartComponent';
import { useSelector } from 'react-redux';
import { selectGameStart } from '../../redux/game/gameSelectors';

const App = () => {
  const [showModal, setShowModal] = useState(true);
  // Состояние для управления содержимым модального окна и текстом кнопки
  const [modalInfo, setModalInfo] = useState({
    component: <PlayerSelector />,
    buttonText: 'start',
  });
  const gameStart = useSelector(selectGameStart);
  const navigate = useNavigate();

  /**
   * Обработчик нажатия кнопки начала игры, скрывает модальное окно.
   * @function
   */
  const handleStartGame = () => {
    setShowModal(false);
  };

  /**
   * Обработчик завершения игры, отображает модальное окно с победителями и сбрасывает игру.
   * @function
   */
  const handleEndGame = () => {
    // Установка содержимого модального окна для отображения победителей и изменение текста кнопки
    setModalInfo({
      component: <WinnersElement players={players} />,
      buttonText: 'Next Game',
    });

    // Показ модального окна и сброс игры
    setShowModal(true);
    //setStartGame(false);
  };

  useEffect(() => {
    // Программное перенаправление в зависимости от значения gameStart
    if (gameStart) {
      navigate('/game');
    } else {
      navigate('/');
    }
  }, [gameStart, navigate]);

  return (
      <Routes>
        <Route path="/" element={<>{!gameStart && <StartComponent />}</>} />
        <Route path="/game" element={<>{gameStart &&  <BlackJackGame /> }</>}/>
      </Routes>
  );
};

export default App;

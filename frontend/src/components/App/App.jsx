import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useGame } from '../../context/gameContext';
import BlackJackGame from '../BlackJackGame/BlackJackGame';
import Modal from '../Modal/Modal';
import PlayerSelector from '../Modal/PlayerSelector/PlayerSelector';
import WinnersElement from '../Modal/WinnersElement/WinnersElement';
import GameManager from '../GameManager/GameManager';

const App = () => {
  const { startGame, setStartGame, playerCount, players } = useGame();
  const [showModal, setShowModal] = useState(true);
  // Состояние для управления содержимым модального окна и текстом кнопки
  const [modalInfo, setModalInfo] = useState({
    component: <PlayerSelector />,
    buttonText: 'start',
  });

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
    setStartGame(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameManager />} />

        <Route
          path="/game"
          element={
            <>
              {showModal && (
                <Modal
                  component={modalInfo.component}
                  buttonText={modalInfo.buttonText}
                  onClick={handleStartGame}
                />
              )}
              {!showModal && startGame && (
                <BlackJackGame
                  initialPlayerCount={playerCount}
                  onEndGame={handleEndGame}
                />
              )}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

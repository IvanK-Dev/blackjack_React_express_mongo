import { useEffect, useState } from 'react';
import {
  Link,
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
} from 'react-router-dom';
import BlackJackGame from '../BlackJackGame/BlackJackGame';
import Modal from '../Modal/Modal';
import PlayerSelector from '../Modal/PlayerSelector/PlayerSelector';
import WinnersElement from '../Modal/WinnersElement/WinnersElement';

import StartComponent from '../StartComponent/StartComponent';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectEndGame,
  selectGameDealer,
  selectGameStart,
} from '../../redux/game/gameSelectors';
import { selectPlayersArr } from '../../redux/players/playersSelectors';
import { clearGame } from '../../redux/game/gameSlice';
import { clearPlayers } from '../../redux/players/playersSlice';
import Loader from '../Loader/Loader';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  // Состояние для управления содержимым модального окна и текстом кнопки
  // const [modalInfo, setModalInfo] = useState({
  //   component: <PlayerSelector />,
  //   buttonText: 'start',
  // });
  const gameStart = useSelector(selectGameStart);
  const endGame = useSelector(selectEndGame);
  const players = useSelector(selectPlayersArr);
  const dealer = useSelector(selectGameDealer);
  const navigate = useNavigate();

  console.log('endGame', endGame);
  /**
   * Обработчик нажатия кнопки начала игры, скрывает модальное окно.
   * @function
   */
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

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

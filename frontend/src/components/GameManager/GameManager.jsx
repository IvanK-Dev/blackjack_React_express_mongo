import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const GameManager = () => {
  const [gameId, setGameId] = useState('');
  const [gameToken, setGameToken] = useState('');
  const [inputError, setInputError] = useState(false);

  const navigate = useNavigate();

  const handleCreateObject = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/game/create`);
      setGameId(response.data.gameId);
      setGameToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameIn = async () => {
    navigate('/game');
    try {
      const response = await axios.get(`http://localhost:3005/api/game/`, {
        params: { gameId },
      });
      setGameToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const newGameId = event.target.value;
    setGameId(newGameId);

    // Проверка на ограничение в 10 символов и установка состояния ошибки
    setInputError(newGameId.length !== 10);
  };

  return (
    <div>
      <h1>Game Management</h1>
      <div>
        <div>
          <button onClick={handleCreateObject}>Create game</button>
          {gameId && <p>Game ID: {gameId}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Game ID (10 characters)"
            value={gameId}
            onChange={handleInputChange}
            className={inputError ? 'error' : ''}
          />

          <button onClick={handleGameIn} disabled={inputError}>
            Game in
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameManager;

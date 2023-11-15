import React, { useState } from 'react';
import axios from 'axios';

const GameManager = () => {
  const [gameId, setGameId] = useState('');
  const [token, setToken] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleCreateObject = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/game/create`);
      setGameId(response.data.gameId);
      setToken(response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/game/`, {
        params: { gameId },
      });
      setToken(response.data.token);
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

          <button onClick={handleLogin} disabled={inputError}>
            Game in
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameManager;

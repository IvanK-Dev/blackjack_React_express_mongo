import React, { useState } from 'react';
import axios from 'axios';

function StartComponent() {
  const [inputGameId, setInputGameId] = useState('');
  const [createdGameId, setCreatedGameId] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleCreateObject = async () => {
    try {
      const response = await axios.get(`http://localhost:3005/api/game/create`);
      setCreatedGameId(response.data.gameId);
      localStorage.setItem('playerToken', response.data.playerToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/game/${inputGameId}`
      );
      localStorage.setItem('playerToken', response.data.playerToken);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const newInputGameId = event.target.value;
    setInputGameId(newInputGameId);

    // Проверка на ограничение в 10 символов и установка состояния ошибки
    setInputError(newInputGameId.length !== 10);
  };

  return (
    <div>
      <h1>Game Management</h1>
      <div>
        <div>
          <button onClick={handleCreateObject} disabled={inputGameId.length>0}>Create game</button>
          {createdGameId && <p>Game ID: {createdGameId}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter Game ID (10 characters)"
            value={inputGameId}
            onChange={handleInputChange}
            maxLength="10"
            className={inputError ? 'error' : ''}
          />

          <button onClick={handleLogin} disabled={inputError}>
            Game in
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartComponent;

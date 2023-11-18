import React, { useState } from 'react';
import axios from 'axios';
import { publicApi, token } from '../../http';

function StartComponent() {
  const [inputGameId, setInputGameId] = useState('');
  const [createdGameId, setCreatedGameId] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleCreateGame = async () => {
    try {
      const {data:{gameId,playerToken}} = await publicApi.get(`/api/game/create`);
      setCreatedGameId(gameId);
      localStorage.setItem('playerToken', `Bearer ${playerToken}`);
      token.set(`Bearer ${playerToken}`)

   
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await publicApi.get(
        `/api/game/${inputGameId}`
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
          <button onClick={handleCreateGame} disabled={inputGameId.length>0}>Create game</button>
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

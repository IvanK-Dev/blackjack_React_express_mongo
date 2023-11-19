import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGameThunk } from '../../redux/game/gameThunk';
import { createPlayerThunk, getAllPlayersThunk } from '../../redux/players/playersThunk';
import {
  selectGameId,
  selectGameStatus,
} from '../../redux/game/gameSelectors';
import { token } from '../../http';

function StartComponent() {
  const [inputGameId, setInputGameId] = useState('');
  const [inputError, setInputError] = useState(false);

  const status = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);

  const dispatch = useDispatch();

  const handleCreateGame = async (evt) => {
    evt.preventDefault();
    try {
     const result= await dispatch(createGameThunk()).unwrap();
      const player=await dispatch(createPlayerThunk(result.gameId)).unwrap()

      token.set(`Bearer ${player.playerToken}`);
    } catch (error) {}
    // try {
    //   const {data:{gameId,playerToken}} = await publicApi.get(`/api/game/create`);
    //   setCreatedGameId(gameId);
    //   localStorage.setItem('playerToken', `Bearer ${playerToken}`);
    //   token.set(`Bearer ${playerToken}`)

    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleJoinToGame = async () => {
    // try {
    //   const response = await publicApi.get(
    //     `/api/game/${inputGameId}`
    //   );
    //   localStorage.setItem('playerToken', response.data.playerToken);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleInputChange = (event) => {
    const newInputGameId = event.target.value;
    setInputGameId(newInputGameId);

    // Проверка на ограничение в 10 символов и установка состояния ошибки
    setInputError(newInputGameId.length !== 10);
  };

    const handleStartGame = async() => {
    await dispatch(getAllPlayersThunk(gameId)).unwrap()
  };
  

  return (
    <div>
      <h1>Game Management</h1>
      <div>
        <div>
          <button onClick={handleCreateGame} disabled={!!gameId}>
            Create game
          </button>
          {gameId && <p>Game ID: {gameId}</p>}
        </div>
        {(gameId===null)&&<div>
          <input
            type="text"
            placeholder="Enter Game ID (10 characters)"
            value={inputGameId}
            onChange={handleInputChange}
            maxLength="10"
            className={inputError ? 'error' : ''}
          />

          <button onClick={handleJoinToGame} disabled={inputError}>
            Game in
          </button>
        </div>}
        <button onClick={handleStartGame} disabled={inputError}>
            Start Game
          </button>

      </div>
    </div>
  );
}

export default StartComponent;

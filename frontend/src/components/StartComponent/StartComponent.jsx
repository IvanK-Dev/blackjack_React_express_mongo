import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGameThunk, getGameInfoThunk } from '../../redux/game/gameThunk';
import {
  createPlayerThunk,
  getAllPlayersThunk,
} from '../../redux/players/playersThunk';
import { selectGameId, selectGameStatus } from '../../redux/game/gameSelectors';
import { token } from '../../http';
import {
  selectPlayerStatus,
  selectPlayerToken,
} from '../../redux/players/playersSelectors';
import { STATUS } from '../../constants/status';
import { toggleStartGame } from '../../redux/game/gameSlice';
import {
  createLogThunk,
  createPlayerLogThunk,
} from '../../redux/logging/logThunk';

function StartComponent() {
  const [inputGameId, setInputGameId] = useState('');
  const [inputError, setInputError] = useState(false);

  const gameStatus = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);
  const playerToken = useSelector(selectPlayerToken);
  const playerStatus = useSelector(selectPlayerStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    token.set(playerToken);
  }, [playerToken]);

  const handleCreateGame = async (evt) => {
    evt.preventDefault();
    try {
      const result = await dispatch(createGameThunk()).unwrap();
      await dispatch(createLogThunk(result.gameId)).unwrap();
      const player = await dispatch(createPlayerThunk(result.gameId)).unwrap();
      const { gameId, playerId, hand } = player;
      await dispatch(createPlayerLogThunk({ gameId, playerId, hand })).unwrap();
    } catch (error) {
      //input toast
    }
  };

  const handleJoinToGame = async (evt) => {
    console.log('handleJoinToGame');
    evt.preventDefault();
    try {
      const { gameId, playerId, hand } = await dispatch(
        createPlayerThunk(inputGameId || gameId)
      ).unwrap();
      await dispatch(createPlayerLogThunk({ gameId, playerId, hand })).unwrap();

      if (!inputError) {
        console.log('handleJoinToGame inputError');

        await dispatch(getGameInfoThunk(inputGameId || gameId)).unwrap();
      }
    } catch (error) {
      //input toast
    }
  };

  const handleInputChange = async (event) => {
    const newInputGameId = event.target.value;
    setInputGameId(newInputGameId);

    // Проверка на ограничение в 10 символов и установка состояния ошибки
    setInputError(newInputGameId.length !== 10);
  };

  const handleStartGame = async () => {
    dispatch(toggleStartGame());
  };

  return (
    <div>
      <h1>Game Management</h1>
      <div>
        <div>
          <button onClick={handleCreateGame} disabled={gameId || inputGameId}>
            Create game
          </button>
          {gameId && <p>Game ID: {gameId}</p>}
        </div>
        {gameId === null && (
          <div>
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
          </div>
        )}
        {gameStatus === STATUS.success && playerStatus === STATUS.success && (
          <button onClick={handleStartGame} disabled={inputError}>
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}

export default StartComponent;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGameThunk, getGameInfoThunk } from '../../redux/game/gameThunk';
import { createPlayerThunk } from '../../redux/players/playersThunk';
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

/**
 * Компонент начального экрана управления игрой.
 * @component
 * @returns {JSX.Element} Элемент компонента StartComponent.
 */
function StartComponent() {
  const [inputGameId, setInputGameId] = useState('');
  const [inputError, setInputError] = useState(false);

  const gameStatus = useSelector(selectGameStatus);
  const gameId = useSelector(selectGameId);
  const playerToken = useSelector(selectPlayerToken);
  const playerStatus = useSelector(selectPlayerStatus);

  const dispatch = useDispatch();

  // Устанавливаем токен игрока при изменении
  useEffect(() => {
    token.set(playerToken);
  }, [playerToken]);

  /**
   * Обработчик создания новой игры.
   * @async
   * @function
   * @param {Event} evt - Событие клика.
   * @returns {Promise<void>}
   */
  const handleCreateGame = useCallback(
    async (evt) => {
      evt.preventDefault();
      try {
        const result = await dispatch(createGameThunk()).unwrap();
        await dispatch(createLogThunk(result.gameId)).unwrap();
        const player = await dispatch(
          createPlayerThunk(result.gameId)
        ).unwrap();
        const { gameId, playerId, hand } = player;
        await dispatch(
          createPlayerLogThunk({ gameId, playerId, hand })
        ).unwrap();
      } catch (error) {
        //input toast
      }
    },
    [dispatch]
  );

  /**
   * Обработчик присоединения к существующей игре.
   * @async
   * @function
   * @param {Event} evt - Событие клика.
   * @returns {Promise<void>}
   */
  const handleJoinToGame = useCallback(async (evt) => {
    console.log('handleJoinToGame');
    evt.preventDefault();
    try {
      const { gameId, playerId, hand } = await dispatch(
        createPlayerThunk(inputGameId || gameId)
      ).unwrap();
      await dispatch(createPlayerLogThunk({ gameId, playerId, hand })).unwrap();

      // Проверка наличия ошибок ввода перед запросом информации об игре
      if (!inputError) {
        console.log('handleJoinToGame inputError');

        await dispatch(getGameInfoThunk(inputGameId || gameId)).unwrap();
      }
    } catch (error) {
      //input toast
    }
  }, []);

  /**
   * Обработчик изменения ввода Game ID.
   * @function
   * @param {Event} event - Событие изменения ввода.
   * @returns {void}
   */
  const handleInputChange = useCallback(async (event) => {
    const newInputGameId = event.target.value;
    setInputGameId(newInputGameId);

    // Проверка на ограничение в 10 символов и установка состояния ошибки
    setInputError(newInputGameId.length !== 10);
  }, []);

  /**
   * Обработчик запуска игры.
   * @function
   * @async
   * @returns {Promise<void>}
   */
  const handleStartGame = useCallback(async () => {
    dispatch(toggleStartGame());
  }, [dispatch]);

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

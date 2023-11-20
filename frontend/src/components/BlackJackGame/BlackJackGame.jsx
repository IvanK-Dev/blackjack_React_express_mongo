import { useCallback, useEffect, useState } from 'react';
import BlackJackGameFactory from '../../services/BlackJackGameFactory';
import DealerFactory from '../../services/DealerFactory';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';
import BotPlayerFactory from '../../services/BotPlayerFactory';
import BotPlayer from '../BotPlayer/BotPlayer';
import {
  dealerOrBotDrawCards,
  delay,
  waitUntilPlayerBust,
  waitUntilPlayerStops,
} from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlayersArr,
  selectorPlayerId,
  selectorPlayerStatus,
  selectorPlayerToken,
} from '../../redux/players/playersSelectors';
import {
  selectGameDealer,
  selectGameId,
  selectGameStart,
} from '../../redux/game/gameSelectors';
import { getAllPlayersThunk } from '../../redux/players/playersThunk';
import { token } from '../../http';
import Loader from '../Loader/Loader';
import { STATUS } from '../../constants/status';
import { dealerGetCardThunk } from '../../redux/game/gameThunk';

/**
 * Компонент, представляющий игру.
 * @component
 * @param {number} initialPlayerCount - Начальное количество игроков.
 * @param {Function} onEndGame - Callback-функция, вызываемая при завершении игры.
 */
const BlackJackGame = () => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayersArr);
  const dealer = useSelector(selectGameDealer);
  const gameId = useSelector(selectGameId);
  const playerToken = useSelector(selectorPlayerToken);
  const playerId = useSelector(selectorPlayerId);
  const gameStart = useSelector(selectGameStart);
  const playersStatus = useSelector(selectorPlayerStatus);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetchData');
      token.set(playerToken);
      dispatch(getAllPlayersThunk(gameId));
    };

    fetchData();
  }, [dispatch, gameId, playerToken]);

  if (!players || playersStatus === STATUS.loading) return <Loader />;


  return (
    // Отрисовка компонента, если есть игроки
    players && (
      <div id="game">
        <div className="box">
          <Dealer participant={dealer} />
          <div id="players-area">
            {players.map((player) => {
              return <Player key={player.playerId} player={player} />;
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default BlackJackGame;

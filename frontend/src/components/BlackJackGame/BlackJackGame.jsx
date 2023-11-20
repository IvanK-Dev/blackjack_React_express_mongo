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
import { selectPlayersArr, selectorPlayerToken } from '../../redux/players/playersSelectors';
import { selectGameDealer, selectGameId } from '../../redux/game/gameSelectors';
import { getAllPlayersThunk } from '../../redux/players/playersThunk';
import { token } from '../../http';

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
  const gameId=useSelector(selectGameId)
  const playerToken=useSelector(selectorPlayerToken)
  const playerId=useSelector(select)

  useEffect(async() => {
    token.set(playerToken);
    await dispatch(getAllPlayersThunk(gameId))
  }, []);

  // Состояние для отслеживания текущего индекса игрока

  //const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Callback-функция для заполнения контекста данными из игры

  // Начало игры и заполнение контекста при монтировании компонента

  // Обработка хода каждого игрока
  // const processPlayers = useCallback(async () => {
  //   const player = game.players[currentPlayerIndex];

  //   // Если игрок - дилер или бот, вытягиваем карты и останавливаем
  //   // if (player instanceof DealerFactory || player instanceof BotPlayerFactory) {
  //   //   dealerOrBotDrawCards(player, deck);
  //   //   player.stopped = true;
  //   // }

  //   // Проверка на перебор
  //   if (player.score > 21) {
  //     player.stopped = true;
  //   }

  //   //Ожидание, пока у игрока будет перебор
  //   waitUntilPlayerBust(player);
  //   // Ожидание, пока игрок не выберет "остановить"
  //   await waitUntilPlayerStops(player);

  //   // Показать счет дилера
  //   if (player instanceof DealerFactory) {
  //     player.scoreVisibleToggle();
  //   }

  //   // Отключить кнопки для всех, кроме дилера и бота
  //   if (
  //     !(player instanceof DealerFactory || player instanceof BotPlayerFactory)
  //   ) {
  //     player.buttonsDisabledToggle();
  //   }

  //   delay(1000);
  //   // Переключение на следующего игрока
  //   setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
  // }, [currentPlayerIndex, deck, game.players]);

  // useEffect(() => {
  //   // Проверяем, что есть игроки и текущий индекс не выходит за пределы массива
  //   if (players.length > 0 && currentPlayerIndex < players.length) {
  //     processPlayers();
  //   }
  //   if (currentPlayerIndex > players.length) {
  //     setTimeout(onEndGame, 1000);
  //   }
  // }, [players, currentPlayerIndex, processPlayers, onEndGame]);

  return (
    // Отрисовка компонента, если есть игроки
    players.length > 0 && (
      <div id="game">
        <div className="box">
          <Dealer
            participant={dealer}
          />
          <div id="players-area">
            {players.map((player) =>{
              console.log(player)
                  return <Player key={player.playerId} player={player} />}
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default BlackJackGame;

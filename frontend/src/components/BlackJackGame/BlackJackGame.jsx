import { useCallback, useEffect, useState } from 'react';
import { useGame } from '../../context/gameContext';
import BlackJackGameFactory from '../../services/BlackJackGameFactory';
import DealerFactory from '../../services/DealerFactory';
import Dealer from '../Dealer/Dealer';
import Player from '../Player/Player';
import BotPlayerFactory from '../../services/BotPlayerFactory';
import BotPlayer from '../BotPlayer/BotPlayer';
import { dealerOrBotDrawCards } from '../../helpers/dealerOrBotDrawCards';
import { waitUntilPlayerBust } from '../../helpers/waitUntilPlayerBust';
import { waitUntilPlayerStops } from '../../helpers/waitUntilPlayerStops';
import { delay } from '../../helpers/delay';

/**
 * Компонент, представляющий игру.
 * @component
 * @param {number} initialPlayerCount - Начальное количество игроков.
 * @param {Function} onEndGame - Callback-функция, вызываемая при завершении игры.
 */
const BlackJackGame = ({ initialPlayerCount, onEndGame }) => {
  // Использование пользовательского хука контекста игры
  const { deck, setDeck, players, setPlayers, setPlayerCount, setStatus } =
    useGame();
  // Создание экземпляра игры при монтировании компонента
  const [game] = useState(() => new BlackJackGameFactory(initialPlayerCount));

  // Состояние для отслеживания текущего индекса игрока
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  // Callback-функция для заполнения контекста данными из игры
  const fillContext = useCallback(
    (game) => {
      setDeck(game.deck);
      setPlayers(game.players);
      setPlayerCount(game.playerCount);
      setStatus(game.status);
    },
    [setDeck, setPlayerCount, setPlayers, setStatus]
  );

  // Начало игры и заполнение контекста при монтировании компонента
  useEffect(() => {
    game.startGame();
    fillContext(game);
  }, [fillContext, game]);

  // Обработка хода каждого игрока
  const processPlayers = useCallback(async () => {
    const player = game.players[currentPlayerIndex];

    // Если игрок - дилер или бот, вытягиваем карты и останавливаем
    if (player instanceof DealerFactory || player instanceof BotPlayerFactory) {
      dealerOrBotDrawCards(player, deck);
      player.stopped = true;
    }

    // Проверка на перебор
    if (player.score > 21) {
      player.stopped = true;
    }

    //Ожидание, пока у игрока будет перебор
    waitUntilPlayerBust(player);
    // Ожидание, пока игрок не выберет "остановить"
    await waitUntilPlayerStops(player);

    // Показать счет дилера
    if (player instanceof DealerFactory) {
      player.scoreVisibleToggle();
    }

    // Отключить кнопки для всех, кроме дилера и бота
    if (
      !(player instanceof DealerFactory || player instanceof BotPlayerFactory)
    ) {
      player.buttonsDisabledToggle();
    }

    delay(1000);
    // Переключение на следующего игрока
    setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
  }, [currentPlayerIndex, deck, game.players]);

  useEffect(() => {
    // Проверяем, что есть игроки и текущий индекс не выходит за пределы массива
    if (players.length > 0 && currentPlayerIndex < players.length) {
      processPlayers();
    }
    if (currentPlayerIndex > players.length) {
      setTimeout(onEndGame, 1000);
    }
  }, [players, currentPlayerIndex, processPlayers, onEndGame]);

  return (
    // Отрисовка компонента, если есть игроки
    players.length > 0 && (
      <div id="game">
        <div className="box">
          <Dealer
            participant={players.find(
              (dealer) => dealer instanceof DealerFactory
            )}
          />
          <div id="players-area">
            {players.map((player) => {
              if (!(player instanceof DealerFactory)) {
                return player instanceof BotPlayerFactory ? (
                  <BotPlayer key={player.id} player={player} />
                ) : (
                  <Player key={player.id} player={player} />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default BlackJackGame;

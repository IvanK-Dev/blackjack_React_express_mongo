import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [deck, setDeck] = useState([]);
  const [players, setPlayers] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [playerCount, setPlayerCount] = useState(1);
  const [status, setStatus] = useState(null);

  const value = {
    deck,
    setDeck,
    players,
    setPlayers,
    startGame,
    setStartGame,
    endGame,
    setEndGame,
    playerCount,
    setPlayerCount,
    status,
    setStatus,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);

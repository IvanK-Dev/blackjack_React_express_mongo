import { gameInitialState } from './game/gameInitialState';
import { playersInitialState } from './players/playersInitialState';

export const rootInitialState = {
  game: gameInitialState,
  players:playersInitialState
};

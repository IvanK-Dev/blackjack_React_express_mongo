import { STATUS } from '../../constants/status';

export const playersInitialState = {
  status: STATUS.idle,
  playerToken: null,
  playerId:null,
  players: [{ playerId: null, hand: null, score: null, stopped: false }],
};

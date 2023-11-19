import { STATUS } from '../../constants/status';

export const playersInitialState = {
  status: STATUS.idle,
  playerToken: null,
  players: [{ playerId: null, hand: null, score: null, stopped: false }],
};

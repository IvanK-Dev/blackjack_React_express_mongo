import { createSlice } from '@reduxjs/toolkit';
import { gameInitialState } from './gameInitialState';
import { STATUS } from '../../constants/status';
import {
  createGameThunk,
  dealerGetCard,
  dealerGetCardThunk,
  getGameInfoThunk,
} from './gameThunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addPlayer } from '../players/playersSlice';

export const gameSlice = createSlice({
  name: 'game',
  initialState: gameInitialState,
  reducers: {
    toggleStartGame: (state) => {
      state.startGame = !state.startGame;
    },
    clearGame: (state) => {
      console.log('clearGame')
      return gameInitialState
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createGameThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(createGameThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.gameId = payload.gameId;
        state.playerIdMove = payload.playerIdMove;

        state.dealer = payload.dealer;
      })
      .addCase(createGameThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(getGameInfoThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(getGameInfoThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.gameId = payload.gameId;
        state.playerIdMove = payload.playerIdMove;
        state.dealer = payload.dealer;

        state.endGame = payload.endGame;

      })
      .addCase(getGameInfoThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(dealerGetCardThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(dealerGetCardThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.dealer = payload.game.dealer;
      })
      .addCase(dealerGetCardThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      }),
});

export const { toggleStartGame,clearGame } = gameSlice.actions;

export const gameReducer = persistReducer(
  { key: 'game', storage },
  gameSlice.reducer
);

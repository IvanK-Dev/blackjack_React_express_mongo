import { createSlice } from '@reduxjs/toolkit';
import { playersInitialState } from './playersInitialState';
import { STATUS } from '../../constants/status';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createPlayerThunk,
  getAllPlayersThunk,
  getCardThunk,
  setPlayerStopped,
} from './playersThunk';
import { token } from '../../http';

export const playersSlice = createSlice({
  name: 'players',
  initialState: playersInitialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createPlayerThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(createPlayerThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;

        state.playerToken = `Bearer ${payload.playerToken}`;
        state.playerId = payload.playerId;
      })
      .addCase(createPlayerThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(getAllPlayersThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(getAllPlayersThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.players = payload.players;
      })
      .addCase(getAllPlayersThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(getCardThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(getCardThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.players = payload.game.players;
      })
      .addCase(getCardThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(setPlayerStopped.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(setPlayerStopped.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.players = payload.game.players;
      })
      .addCase(setPlayerStopped.rejected, (state) => {
        state.status = STATUS.rejected;
      }),
});

export const playersReducer = persistReducer(
  { key: 'players', storage },
  playersSlice.reducer
);

import { createSlice } from '@reduxjs/toolkit';
import { gameInitialState } from './gameInitialState';
import { STATUS } from '../../constants/status';
import { createGameThunk } from './gameThunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addPlayer } from '../players/playersSlice';

export const gameSlice = createSlice({
  name: 'game',
  initialState: gameInitialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createGameThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(createGameThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.gameId = payload.gameId;

        state.dealer = payload.dealer;
      })
      .addCase(createGameThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      }),
});

export const gameReducer = persistReducer(
  { key: 'game', storage },
  gameSlice.reducer
);

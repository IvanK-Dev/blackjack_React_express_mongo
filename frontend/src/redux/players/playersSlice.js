import { createSlice } from '@reduxjs/toolkit';
import { playersInitialState } from './playersInitialState';
import { STATUS } from '../../constants/status';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createPlayerThunk, getAllPlayersThunk } from './playersThunk';

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
        state.playerToken=payload.playerToken;
      })
      .addCase(createPlayerThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
      .addCase(getAllPlayersThunk.pending, (state) => {
        state.status = STATUS.loading;
      })
      .addCase(getAllPlayersThunk.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.players=payload.players;
      })
      .addCase(getAllPlayersThunk.rejected, (state) => {
        state.status = STATUS.rejected;
      })
});

export const playersReducer = persistReducer(
  { key: 'players', storage },
  playersSlice.reducer
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicApi } from '../../http';

export const createGameThunk = createAsyncThunk('createGame', async () => {
  const { data } = await publicApi.get(`/api/game/create`);

  return data;
});

export const getGameInfoThunk = createAsyncThunk(
  'getGameInfo',
  async (gameId) => {
    const { data } = await publicApi.get(`/api/game/${gameId}`);

    return data;
  }
);

export const dealerGetCardThunk = createAsyncThunk(
  'dealerGetCard',
  async (gameId) => {
    const { data } = await publicApi.get(`/api/game/${gameId}/dealerGetCard`);
    return data;
  }
);

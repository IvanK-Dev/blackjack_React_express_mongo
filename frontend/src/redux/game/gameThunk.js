import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicApi } from '../../http';

export const createGameThunk = createAsyncThunk('createGame', async () => {
  const { data } = await publicApi.get(`/api/game/create`);

  return data;
});

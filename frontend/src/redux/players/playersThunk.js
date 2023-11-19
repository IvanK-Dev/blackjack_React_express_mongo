import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi } from '../../http';

export const createPlayerThunk = createAsyncThunk(
  'createPlayer',
  async (gameId) => {
    const { data } = await publicApi.get(`/api/game/${gameId}`);

    return data;
  }
);

export const getAllPlayersThunk = createAsyncThunk(
  'getAllPlayers',
  async (gameId) => {
    const { data } = await privateApi.get(`/api/game/${gameId}/getAllPlayers`);

    return data;
  }
);


import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi, token } from '../../http';

export const createPlayerThunk = createAsyncThunk(
  'createPlayer',
  async (gameId) => {
    const { data } = await publicApi.get(`/api/game/${gameId}/craetePlayer`);

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


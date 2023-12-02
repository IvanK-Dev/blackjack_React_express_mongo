import { createAsyncThunk } from '@reduxjs/toolkit';
import { privateApi, publicApi, token } from '../../http';

export const createPlayerThunk = createAsyncThunk(
  'createPlayer',
  async (gameId) => {
    const { data } = await publicApi.get(`/api/game/${gameId}/createPlayer`);
    console.log('createPlayer',data)
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

export const getCardThunk = createAsyncThunk(
  'getCard',
  async (gameId) => {
    const { data } = await privateApi.get(`/api/game/${gameId}/getCard`);
    return data;
  }
);

export const setPlayerStopped = createAsyncThunk(
  'playerStop',
  async (gameId) => {
    const { data } = await privateApi.get(`/api/game/${gameId}/playerStop`);
    return data;
  }
);

setPlayerStopped

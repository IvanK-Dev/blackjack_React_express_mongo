import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicApi } from '../../http';

export const createLogThunk = createAsyncThunk('createLog', async (gameId) => {
  await publicApi.get(`/api/logging/${gameId}`);
});

export const createPlayerLogThunk = createAsyncThunk(
  'createPlayerLog',
  async ({gameId,playerId,hand}) => {
    await publicApi.post(`/api/logging/${gameId}/createPlayer`, { playerId, hand });
  }
);

// export const getGameInfoThunk = createAsyncThunk(
//   'getGameInfo',
//   async (gameId) => {
//     const { data } = await publicApi.get(`/api/game/${gameId}`);

//     return data;
//   }
// );

// export const dealerGetCardThunk = createAsyncThunk(
//   'dealerGetCard',
//   async (gameId) => {
//     const { data } = await publicApi.get(`/api/game/${gameId}/dealerGetCard`);
//     return data;
//   }
// );

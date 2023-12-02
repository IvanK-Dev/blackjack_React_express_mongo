import { createSlice } from '@reduxjs/toolkit';
import {  logInitialState } from './logInitialState';
import {
  createLogThunk,
} from './gameThunk';
import { createPlayerLog } from '../../../../server/controllers/log/createPlayerLog';

export const loggingSlice = createSlice({
  name: 'Logging',
  initialState: logInitialState,
  reducers: {},
  extraReducers: (builder) =>
  builder
  .addCase(createLogThunk.pending, () => {
  })
  .addCase(createLogThunk.fulfilled, () => {
  })
  .addCase(createLogThunk.rejected, () => {
  })
  .addCase(createPlayerLog.pending, () => {
  })
  .addCase(createPlayerLog.fulfilled, () => {
  })
  .addCase(createPlayerLog.rejected, () => {
  })
});


export const LogReducer =  loggingSlice.reducer


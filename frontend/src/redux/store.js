import { configureStore } from '@reduxjs/toolkit';
import { rootInitialState } from './rootInitialState';
import { gameReducer } from './game/gameSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import { playersReducer } from './players/playersSlice';

export const store = configureStore({
  preloadedState: rootInitialState,
  devTools: true,
  reducer: {
    game: gameReducer,
    players:playersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import superheroReducer from './slices/superheroSlice';

export const store = configureStore({
  reducer: {
    superheroes: superheroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

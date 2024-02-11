// redux/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/slice';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

// Define el tipo RootState directamente en el archivo store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
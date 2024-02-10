// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/slice';
import authReducer from './reducers/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    authReducer,
  },
});

// Define el tipo RootState directamente en el archivo store.ts
export type RootState = ReturnType<typeof store.getState>;

export default store;
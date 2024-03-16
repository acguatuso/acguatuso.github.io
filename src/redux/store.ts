// redux/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import empresaReducer from './reducers/empresaSlice';
import aboutReducer from './reducers/aboutSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    empresa: empresaReducer,
    about: aboutReducer
  },
});

// Define el tipo RootState directamente en el archivo store.ts
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
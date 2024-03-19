import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './reducers/authSlice';
import empresaReducer from './reducers/empresaSlice';
import aboutReducer from './reducers/aboutSlice';

// Configuración de Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedEmpresaReducer = persistReducer(persistConfig, empresaReducer);
const persistedAboutReducer = persistReducer(persistConfig, aboutReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    empresa: persistedEmpresaReducer,
    about: persistedAboutReducer,
  },
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;

// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { auth_fire} from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthState {
  loggedIn: boolean;
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    signupSuccess: (state, action: PayloadAction<any>) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
  }
});


export const { loginSuccess, loginFailure, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer;

export const login = (email: string, password: string): AppThunk => async dispatch => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth_fire, email, password);
    dispatch(loginSuccess(userCredential.user!));
  } catch (error:any) {
    dispatch(loginFailure(error.message));
  }
};

export const signup = (email: string, password: string): AppThunk => async dispatch => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth_fire, email, password);
    dispatch(signupSuccess(userCredential.user!));
  } catch (error:any) {
    dispatch(signupFailure(error.message));
  }
};
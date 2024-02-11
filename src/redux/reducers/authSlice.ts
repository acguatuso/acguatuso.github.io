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
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    signupSuccess: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  }
});


export const { loginSuccess, loginFailure, signupSuccess, signupFailure,logOut} = authSlice.actions;
export default authSlice.reducer;

export const login = (email: string, password: string): AppThunk => async dispatch => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth_fire, email, password);
    dispatch(loginSuccess(userCredential.user.email!));
  } catch (error:any) {
    const msg = error.message.replace('Firebase: ', '');
    dispatch(loginFailure(msg));
  }
};

export const signup = (email: string, password: string): AppThunk => async dispatch => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth_fire, email, password);
    console.log(userCredential.user.email)
    dispatch(signupSuccess(userCredential.user.email!));
  } catch (error:any) {
    //console.log(error.message)
    const msg = error.message.replace('Firebase: ', '');
    dispatch(signupFailure(msg));
  }
};
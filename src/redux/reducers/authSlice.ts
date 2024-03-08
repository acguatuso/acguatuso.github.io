// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { auth_fire, data_base} from '../../firebase';
import { Timestamp, collection, addDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

interface AuthState {
  notification : string | null;
  emailVerified: boolean;
  loggedIn: boolean;
  user: any | null;
  error: string | null;
}

const initialState: AuthState = {
  notification: null,
  emailVerified: false,
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
      state.emailVerified = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      state.user = null;
      state.error = action.payload;
    },
    signupSuccess: (state, action: PayloadAction<{ msg: string, emailVerified: boolean }>) => {
      state.loggedIn = false;
      state.notification = action.payload.msg;
      state.emailVerified = action.payload.emailVerified;
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

    // Verifica si el correo electrónico del usuario está verificado
    if (!userCredential.user.emailVerified) {
      throw new Error('Por favor, verifica tu dirección de correo electrónico antes de iniciar sesión.');
    }
    
    dispatch(loginSuccess(userCredential.user.email!));
  } catch (error:any) {
    const msg = error.message.replace('Firebase: ', '');
    dispatch(loginFailure(msg));
  }
};

export const signup = (formData: any): AppThunk => async dispatch => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth_fire, formData.email, formData.password);
      console.log(userCredential.user.email)

      // Datos del nuevo documento
      const nuevoDocumento = {
        nombre: formData.name,
        correo: formData.email,
        cedula: formData.cedula,
        telefono: formData.telefono,
        provincia: formData.provincia,
        canton: formData.canton,
        distrito: formData.distrito,
        direccion: formData.direccion,
        fechaNacimiento: Timestamp.fromDate(new Date(formData.fechaNacimiento)),
        genero: formData.genero,
        user_type: parseInt(formData.userType,10)
      };

      // Referencia a la coleccion de 'Usuarios'
      const users_collection_ref = collection(data_base, "Usuarios"); 

      // Agrega el nuevo documento a la colección 'Usuarios'
      try {
        
        const documentoRef = await addDoc(users_collection_ref, nuevoDocumento);
        console.log("Documento agregado con ID: ", documentoRef.id);
      } catch (error) {
        console.error("Error al agregar documento: ", error);
      }

      // Envía el correo de verificación
      await sendEmailVerification(userCredential.user);

      const texto = 'Cuenta creada con éxtio!'
      dispatch(signupSuccess({msg: texto!,emailVerified: userCredential.user.emailVerified }));

    } catch (error:any) {
      //console.log(error.message)
      const msg = error.message.replace('Firebase: ', '');
      dispatch(signupFailure(msg));
    }
};
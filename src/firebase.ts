// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYLJeEfFs7lQUJbczLFP87sLr7oDGK73Y",
  authDomain: "acguatuso-sys.firebaseapp.com",
  projectId: "acguatuso-sys",
  storageBucket: "acguatuso-sys.appspot.com",
  messagingSenderId: "148217571881",
  appId: "1:148217571881:web:5b959afe3352b16dae0a38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de Firestore si estás utilizando Firestore
export const data_base = getFirestore(app); 

// Obtener el objeto de autenticación de Firebase
export const auth_fire = getAuth(app);
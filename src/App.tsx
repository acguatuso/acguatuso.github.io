import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router/AppRouter.tsx';
import Layout from './ui/layout.tsx';
import './App.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut, loginSuccess } from './redux/reducers/authSlice.ts';

function App() {
  // Redux Hooks & Access
  const dispatch = useDispatch();
  useEffect(() => {
    // Esta función se ejecutará al cargar la página
    const checkAuthOnLoad = async () => {
      // Recuperar los datos de autenticación del almacenamiento local
      const userFromStorage = localStorage.getItem('user');

      if (userFromStorage) {
        // Si hay datos de usuario en el almacenamiento local, iniciar sesión automáticamente
        dispatch(loginSuccess(JSON.parse(userFromStorage)));
      } else {
        // Si no hay datos de usuario, cerrar sesión automáticamente
        dispatch(logOut());
      }
    };

    checkAuthOnLoad(); // Llamar a la función al cargar la página
  }, [dispatch,]);
  // Dentro del componente Router<Layout> se encapsula se pasa como children AppRouter, 
  // LAyout posee por defecto header/navbar y footer
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  )
}

export default App

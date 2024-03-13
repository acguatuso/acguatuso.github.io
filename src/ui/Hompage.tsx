import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  // React-router-dom
  const navigate = useNavigate();
  // Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const emailVerified = useSelector((state: RootState) => state.auth.emailVerified);

  console.log('Conectado: ', loggedIn);
  // Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

  return (
    <>
      <h1>HomePage</h1>
      <div className='card shadow-lg'>
        {loggedIn && user && emailVerified &&
          <div >
            <p>Bienvenido, {user.nombre}!</p>
            <p>Fecha de Nacimiento: {user.fechaNacimiento.valueOf()}</p>
          </div>}
      </div>

    </>
  )
}

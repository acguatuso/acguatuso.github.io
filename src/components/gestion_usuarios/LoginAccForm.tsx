import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, login} from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';

const LoginAccountForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const emailVerified = useSelector((state: RootState) => state.auth.emailVerified);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se envíe la solicitud HTTP predeterminada
    dispatch(login(email, password) as any); // Usa dispatch para llamar a la acción login
  };

  const handleLogOut = () => {
    dispatch(logOut());
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          {loggedIn && user && emailVerified &&
            <div>
                <p>Bievenido! {user.nombre}</p>
                <button onClick={handleLogOut}>Cerrar Sesión</button>
            </div>
           }
          {error && (
            <div className="alert-popup">
              <div className="alert-message">
                <span>{error}</span>
              </div>
            </div>
          )}
          {!user && ( 
            <form onSubmit={handleLogin}>
              <h2 >Iniciar Sesión</h2>
              <div>
                <label htmlFor="email" >Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} />
              </div>
              <div >
                <label htmlFor="password" >Contraseña:</label>
                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit" >Iniciar Sesión</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginAccountForm;

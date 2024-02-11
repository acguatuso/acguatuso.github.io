import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../redux/reducers/authSlice';
import { RootState } from '../redux/store';

const CreateAccountForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se envíe la solicitud HTTP predeterminada
    dispatch(login(email, password) as any); // Usa dispatch para llamar a la acción login
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se envíe la solicitud HTTP predeterminada
    dispatch(signup(email, password) as any); // Usa dispatch para llamar a la acción signup
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Crear Cuenta</h2>
          {loggedIn && user && <p>Correo electrónico: {user}</p>}
          {error && (
            <div className="alert-popup">
              <div className="alert-message">
                <span>{error}</span>
              </div>
            </div>
          )}
          {!user && ( 
            <form onSubmit={handleSignUp}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input type="password" id="password" className="form-control" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit" className="btn btn-primary">Crear Cuenta</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAccountForm;

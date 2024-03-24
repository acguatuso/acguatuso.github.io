import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../CSS/Components/LoginAccStyle.css';
import ForgotPassword from './ForgotPassword';
import { fetchEmpresaData } from '../../redux/reducers/empresaSlice';

const LoginAccountForm: React.FC = () => {
  // React-router-dom
  const navigate = useNavigate();

  // Local States
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  // Redux Hooks & Access
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);
  const emailVerified = useSelector((state: RootState) => state.auth.emailVerified);
  //const states = useSelector((state: RootState) => state);
  //console.log(states, 'login')

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se envíe la solicitud HTTP predeterminada
    setTimeout(() => {
      dispatch(login(email, password) as any); // Usa dispatch para llamar a la acción login
    }, 1000);

  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Redireccionar si está logueado, hay usuario y email verificado
  useEffect(() => {
    dispatch(fetchEmpresaData() as any);

    if (loggedIn && user && emailVerified) {
      navigate("/home");
    }
  }, [loggedIn, user, emailVerified, navigate, dispatch]);

  return (
    <>
      <div className="container">
        <div>
          <img src="/src/assets/LogoUCAG.png" alt="Bootstrap" width="200" height="150" />
          <h2>Bienvenido!</h2>
          <h2>Inicio de Sesión</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className='card shadow-lg'>
              {error && (
                <div className="alert-popup">
                  <div className="alert-message alert alert-danger">
                    <span>{error}</span>
                  </div>
                </div>
              )}
              {!user && (
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-start text-muted" >Correo:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Ej: correo@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-start text-muted">Contraseña:</label>
                    <div className="input-group">
                      <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="Ej: contraseña123" />
                      <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Utiliza los íconos de ojo visible/novisible */}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
              )}
            </div>
            <br />
            <div>
              <label>¿No tiene cuenta?</label>
              <Link to="/crear-cuenta">Crear Cuenta</Link>
            </div>
            <div>
              <span>¿Olvidaste tu contraseña? </span>
              <span className="link-style" onClick={() => setIsForgotPasswordModalOpen(true)} >Haz clic aquí</span>
              <ForgotPassword isOpen={isForgotPasswordModalOpen} onClose={() => setIsForgotPasswordModalOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default LoginAccountForm;

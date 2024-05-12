import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../../CSS/Components/LoginAccStyle.css';
import ForgotPassword from './ForgotPassword';
import { ref, getDownloadURL } from 'firebase/storage';
import { firebase_storage } from '../../firebase';

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

  // Ref for logo image
  const logoImgRef = useRef<HTMLImageElement>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default HTTP request

    setTimeout(() => {
      dispatch(login(email, password) as any); // Dispatch the login action
    }, 1000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageRef = ref(firebase_storage, 'Empresa/Logo/logo');
        const url = await getDownloadURL(imageRef);
        if (logoImgRef.current) {
          logoImgRef.current.src = url;
        }
      } catch (error) {
        console.error('Error downloading logo:', error);
      }
    };

    loadImage();
  }, []);

  // Redirect if logged in, user exists, and email is verified
  useEffect(() => {
    if (loggedIn && user && emailVerified) {
      const timeoutId = setTimeout(() => {
        navigate("/ucag-admin/home"); // Redirect user to home page
      }, 3 * 1000); // Convert seconds to milliseconds

      // Clear the timer if the component unmounts before it completes
      return () => clearTimeout(timeoutId);
    }
  }, [loggedIn, user, emailVerified, navigate]);

  return (
    <div className="container">
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
                <div>
                  <img ref={logoImgRef} alt="logo" width="200" height="150" />
                  <h3>Welcome!</h3>
                  <h3>Login</h3>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-start text-muted" >Email:</label>
                  <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="E.g., email@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-start text-muted">Password:</label>
                  <div className="input-group">
                    <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="E.g., password123" />
                    <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Use eye visible/invisible icons */}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <div>
                  <br />
                  <label>Don't have an account?</label>
                  <Link to="/ucag-admin/crear-cuenta">Create Account</Link>
                </div>
                <div>
                  <span>Forgot your password? </span>
                  <span className="link-style" onClick={() => setIsForgotPasswordModalOpen(true)} >Click here</span>
                  <ForgotPassword isOpen={isForgotPasswordModalOpen} onClose={() => setIsForgotPasswordModalOpen(false)} />
                </div>
              </form>
            )}
            {user && (
              <div>
                <div>
                  <img ref={logoImgRef} alt="logo" width="200" height="150" />
                  <h3>Welcome!</h3>
                </div>
                <label>Correct Credentials!</label>
                <label>Hello {user.name}!</label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAccountForm;

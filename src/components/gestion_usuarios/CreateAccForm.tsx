import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';
import '../../CSS/Components/CreateAccStyle.css'

const CreateAccountForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState('');
  const [canton, setCanton] = useState('');
  const [distrito, setDistrito] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  // Redux Hooks & Access
  const dispatch = useDispatch();
  const emailVerified = useSelector((state: RootState) => state.auth.emailVerified);
  const notification = useSelector((state: RootState) => state.auth.notification);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se envíe la solicitud HTTP predeterminada
    dispatch(signup(email, password) as any); // Usa dispatch para llamar a la acción signup
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleCedulaChange = (e:any) => {
    setCedula(e.target.value);
  };

  const handleTelefonoChange = (e:any) => {
    setTelefono(e.target.value);
  };

  const handleProvinciaChange = (e:any) => {
    setProvincia(e.target.value);
  };

  const handleCantonChange = (e:any) => {
    setCanton(e.target.value);
  };

  const handleDistritoChange = (e:any) => {
    setDistrito(e.target.value);
  };

  const handleDireccionChange = (e:any) => {
    setDireccion(e.target.value);
  };

  const handleFechaNacimientoChange = (e:any) => {
    setFechaNacimiento(e.target.value);
  };

  return (
    <>
      <div>
        <div>
          <h2>Bienvenido! Crer Cuenta Usuario </h2>
          {!emailVerified && notification &&
            <div>
                <p>{notification} , Debes confirmar tu correo electrónico! </p>
            </div>
           }
          {error && (
            <div>
              <div>
                <span>{error}</span>
              </div>
            </div>
          )}
          {!notification && ( 
            <div className='card'>
             <form onSubmit={handleSignUp} className="signup-form">
              <div className="column">
                <div>
                  <label htmlFor="nombre">Nombre Completo:</label>
                  <input type="text" id="nombre" value={name} onChange={handleNameChange} placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                  <input type="date" id="fecha_nacimiento" value={fechaNacimiento} onChange={handleFechaNacimientoChange} />
                </div>
                <div> 
                  <label htmlFor="provincia">Provincia:</label>
                  <select id="provincia" value={provincia} onChange={handleProvinciaChange}>
                    <option value="">Seleccione una provincia...</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="direccion_exacta">Dirección Exacta:</label>
                  <input type="text" id="direccion_exacta" value={direccion} onChange={handleDireccionChange} placeholder="Ej: 123 Calle Principal, Barrio Los Ángeles" />
                </div>
              </div>
              <div className="column">
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder="Ej: correo@example.com" />
                </div>
                <div>
                  <label htmlFor="telefono">Teléfono:</label>
                  <input type="text" id="telefono" value={telefono} onChange={handleTelefonoChange} placeholder="Ej: 8888-8888" />
                </div>
                <div>
                  <label htmlFor="canton">Cantón:</label>
                  <select id="canton" value={canton} onChange={handleCantonChange}>
                    <option value="">Seleccione un cantón...</option>
                  </select>
                </div>
              </div>
              <div className="column">
                <div>
                  <label htmlFor="password">Contraseña:</label>
                  <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder="Ej: contraseña123" />
                </div>
                <div>
                  <label htmlFor="cedula">Cédula:</label>
                  <input type="text" id="cedula" value={cedula} onChange={handleCedulaChange} placeholder="Ej: 123456789" />
                </div>
                <div>
                  <label htmlFor="distrito">Distrito:</label>
                  <select id="distrito" value={distrito} onChange={handleDistritoChange}>
                    <option value="">Seleccione un distrito...</option>
                  </select>
                </div>
               </div>
                <button type="submit">Crear Cuenta</button>
              </form>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateAccountForm;

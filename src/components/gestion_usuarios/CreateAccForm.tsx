import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';
import '../../CSS/Components/CreateAccStyle.css'

const CreateAccountForm: React.FC = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    cedula: '',
    telefono: '',
    provincia: '',
    canton: '',
    distrito: '',
    direccion: '',
    fechaNacimiento: '',
    genero: '',
    user_type: ''
  };

  // Redux Hooks & Access
  const dispatch = useDispatch();
  const emailVerified = useSelector((state: RootState) => state.auth.emailVerified);
  const notification = useSelector((state: RootState) => state.auth.notification);
  const error = useSelector((state: RootState) => state.auth.error);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Verificar si todos los campos están llenos
    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    
    if (!isFormFilled) {
      alert("Por favor llene todos los campos");
      return;
    }

    dispatch(signup(formData) as any);
  };

  return (
    <>
      <div>
        <div>
          <h2>Bienvenido! Crer Cuenta Usuario </h2>
          {!emailVerified && notification &&
            <div>
              <p>{notification}, Debes confirmar tu correo electrónico! </p>
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
                    <label htmlFor="name">Nombre Completo:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Juan Pérez" />
                  </div>
                  <div>
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                  </div>
                  <div> 
                    <label htmlFor="provincia">Provincia:</label>
                    <select id="provincia" name="provincia" value={formData.provincia} onChange={handleChange}>
                      <option value="">Seleccione un provincia...</option>
                      <option value="Alajuela">Alajuela</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="direccion">Dirección Exacta:</label>
                    <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Ej: 123 Calle Principal, Barrio Los Ángeles" />
                  </div>
                </div>
                <div className="column">
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Ej: correo@example.com" />
                  </div>
                  <div>
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ej: 8888-8888" />
                  </div>
                  <div>
                    <label htmlFor="canton">Cantón:</label>
                    <select id="canton" name="canton" value={formData.canton} onChange={handleChange}>
                      <option value="">Seleccione un cantón...</option>
                      <option value="San Carlos">San Carlos</option>
                    </select>
                  </div>
                  <div> 
                    <label htmlFor="genero">Género:</label>
                    <select id="genero" name="genero" value={formData.genero} onChange={handleChange}>
                      <option value="">Seleccione un género...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="column">
                  <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Ej: contraseña123" />
                  </div>
                  <div>
                    <label htmlFor="cedula">Cédula:</label>
                    <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} placeholder="Ej: 123456789" />
                  </div>
                  <div>
                    <label htmlFor="distrito">Distrito:</label>
                    <select id="distrito" name="distrito" value={formData.distrito} onChange={handleChange}>
                      <option value="">Seleccione un distrito...</option>
                      <option value="Katira">Katira</option>
                      <option value="Palmera">Palmera</option>
                    </select>
                  </div>
                  <div> 
                    <label htmlFor="user_type">Tipo de Usuario:</label>
                    <select id="user_type" name="user_type" value={formData.user_type} onChange={handleChange}>
                      <option value="">Seleccione tipo de usuario...</option>
                      <option value="0">0. Usuario Común</option>
                      <option value="1">1. Usuario Administrador</option>
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
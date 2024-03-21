import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/reducers/authSlice';
import { RootState } from '../../redux/store';
import '../../CSS/Components/CreateAccStyle.css';
import { Link } from 'react-router-dom';

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
    <div>
      <div className="container">
        <div>
          <img src="/src/assets/LogoUCAG.png" alt="Bootstrap" width="200" height="150" />
          <h2>Bienvenido!</h2>
          <h2>Crear Cuenta de Usuario </h2>
        </div>
        {!emailVerified && notification && (
          <div>
            <p>{notification}, Debes confirmar tu correo electrónico! </p>
          </div>
        )}
        {error && (
          <div>
            <div>
              <span>{error}</span>
            </div>
          </div>
        )}
        {!notification && (
          <div className="card shadow-lg">
            <form onSubmit={handleSignUp} className="signup-form">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="name">Nombre Completo:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="provincia">Provincia:</label>
                    <select id="provincia" name="provincia" value={formData.provincia} onChange={handleChange} className="form-control">
                      <option value="">Seleccione una provincia...</option>
                      <option value="Alajuela">Alajuela</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccion">Dirección Exacta:</label>
                    <input type="text" id="direccion" name="direccion" value={formData.direccion} onChange={handleChange} className="form-control" placeholder="Ej: 123 Calle Principal, Barrio Los Ángeles" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="email">Correo:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Ej: correo@example.com" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telefono">Teléfono:</label>
                    <input type="text" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control" placeholder="Ej: 8888-8888" pattern="\d*" title="Solo se permiten números" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="canton">Cantón:</label>
                    <select id="canton" name="canton" value={formData.canton} onChange={handleChange} className="form-control">
                      <option value="">Seleccione un cantón...</option>
                      <option value="San Carlos">San Carlos</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="genero">Género:</label>
                    <select id="genero" name="genero" value={formData.genero} onChange={handleChange} className="form-control">
                      <option value="">Seleccione un género...</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                      <option value="O">Otro</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Ej: contraseña123" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cedula">Cédula:</label>
                    <input type="text" id="cedula" name="cedula" value={formData.cedula} onChange={handleChange} className="form-control" placeholder="Ej: 123456789" pattern="\d*" title="Solo se permiten números" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="distrito">Distrito:</label>
                    <select id="distrito" name="distrito" value={formData.distrito} onChange={handleChange} className="form-control">
                      <option value="">Seleccione un distrito...</option>
                      <option value="Katira">Katira</option>
                      <option value="Palmera">Palmera</option>
                    </select>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Crear Cuenta</button>
            </form>
          </div>
        )}
      </div>
      <br />
      <div>
        <label>¿Ya tiene cuenta?</label>
        <Link to="/iniciar-sesion">Iniciar Sesión</Link>
      </div>
    </div>
  );
};
export default CreateAccountForm;
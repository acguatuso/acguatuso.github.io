import { Link, useNavigate } from 'react-router-dom';
import './CursosMain.css'
import { RootState } from "../../redux/store";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function CursosMain() {
    // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
    // React-router-dom
    const navigate = useNavigate();
    // Redux Hooks & Access
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    console.log('Conectado: ', loggedIn);
    // Redireccionar si está no logueado, y no hay usuario
    useEffect(() => {
        if (!loggedIn && !user) {
            navigate("/");
        }
    }, [loggedIn, user, navigate]);
    
    return (
        <>
            <h2>Gestión del Sistema de Matrícula</h2>
            <div className="container opciones-container">
                <div className="row">
                    <div className="col-6">
                        <h3>Matrícula</h3>
                        <button className="btn btn-primary">Aceptar/Rechazar</button>
                        <h3>Registro</h3>
                        <button className="btn btn-primary">Aprobar/Reprobar</button>
                    </div>
                    <div className="col-6">
                        <h3>Cursos</h3>
                        <Link to="/gestionar-cursos">
                            <button className="btn btn-primary">Gestionar Oferta de Cursos</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CursosMain;

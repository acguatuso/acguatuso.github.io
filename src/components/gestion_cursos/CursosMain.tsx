import { Link } from 'react-router-dom';
import './CursosMain.css'

function CursosMain() {
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

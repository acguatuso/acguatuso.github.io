import { Link } from 'react-router-dom';
import './CursosMain.css'

function CursosMain() {
    return (
        <>
        <h2>Gestión del Sistema de Matricula</h2>
        <div className="opciones-container">
            <div className="columna columna-izquierda">
                <h3>Matricula</h3>
                <button>Aceptar/Rechazar</button>
                <h3>Registro</h3>
                <button>Aprobar/Reprobar</button>
            </div>
            <div className="columna columna-derecha">
                <h3>Cursos</h3>
                <Link to="/gestionar-cursos"><button>Gestionar Oferta de Cursos</button></Link>
            </div>
        </div>
        </>
    );
}
  
export default CursosMain;
import { Link } from 'react-router-dom';
import './ToolbarHeader.css'; // Estilo CSS para el header

function ToolbarHeader() {
  return (
    <header className="toolbar-header">
      <nav className="toolbar-navigation">
        <div className="toolbar-logo">
          {/* Colocar aquí tu logo */}
          Logo
        </div>
        <div className="spacer" />
        <div className="toolbar-navigation-items">
          <ul>
            <li>
              <Link to="/iniciar-sesion">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/crear-cuenta">Crear Cuenta</Link>
            </li>
            {/* Agrega más enlaces según sea necesario */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default ToolbarHeader;


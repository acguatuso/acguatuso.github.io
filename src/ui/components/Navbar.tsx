import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; // Importa los estilos del Navbar

export const Navbar = () => {
    return (
        <div className="navbar-container">
            <nav className="navbar navbar-expand-sm text-dark bg-dark p-2">
                <div className="container-fluid">
                        
                    <NavLink
                        className="navbar-brand"
                        to="/"
                    >
                        <img src="/src/assets/LogoUCAG.png" alt="Bootstrap" width="110" height="80" />
                            
                    </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        
                            <div className="navbar-collapse">
                                <div className="navbar-nav">
        

                                <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/iniciar-sesion"
                                    >
                                        Iniciar Sesion
                                    </NavLink>
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/crear-cuenta"
                                    >
                                        Crear Cuenta
                                    </NavLink>

                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`} 
                                        to="/home"
                                    >
                                        Inicio
                                    </NavLink>
        
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/nombre2"
                                    >
                                        Estudiantes
                                    </NavLink>
        
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/nombre3"
                                    >
                                        Cursos
                                    </NavLink>
        
        
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/nombre5"
                                    >
                                        Servicios
                                    </NavLink>
        
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/nombre6"
                                    >
                                        Avisos
                                    </NavLink>
        
                                    <NavLink 
                                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active': '' } navbar-text-white`}
                                        to="/about"
                                    >
                                        Acerca
                                    </NavLink>

                                    
                                </div>
                            </div>
        
                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                                <ul className="navbar-nav ml-auto">
                                    
                                    <span className="nav-item nav-link testprimary navbar-text-white">
                                        NombreAdmin
                                    </span>
        
                                    <button
                                        className="nav-item nav-link btn navbar-text-white"
                                    >
                                        Cerrar Sesión
                                    </button>
        
                                </ul>
                            </div>
                        </div>
                    </div>
            </nav>
        </div>
    )
}


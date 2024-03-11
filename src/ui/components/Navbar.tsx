import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { logOut} from '../../redux/reducers/authSlice';
import './Navbar.css';

export const Navbar = () => {

    // Redux Hooks & Access
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);

    const navigate = useNavigate();

    
    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/iniciar-sesion', {replace : true})
    }

    return (

        <div className="navbar-container">

            <body>
                <nav className="navbar navbar-expand-sm fixed-top text-dark bg-dark p-2">
                    <div className="container-fluid">

                        <NavLink
                            className="navbar-brand"
                            to="/home"
                        >
                            <img src="/src/assets/LogoUCAG.png" alt="Bootstrap" width="110" height="80" />

                        </NavLink>
                        <button className="navbar-toggler navbar-dark navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar-collapse-custom" id="navbarTogglerDemo01">

                            <div className="navbar-collapse ">
                            {user && (
                                <div className="navbar-nav">

                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/home"
                                    >
                                        Inicio
                                    </NavLink>

                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/nombre2"
                                    >
                                        Estudiantes
                                    </NavLink>

                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/Cursos"
                                    >
                                        Cursos
                                    </NavLink>


                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/nombre5"
                                    >
                                        Servicios
                                    </NavLink>

                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/nombre6"
                                    >
                                        Avisos
                                    </NavLink>

                                    <NavLink
                                        className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                        to="/about"
                                    >
                                        Acerca
                                    </NavLink>


                                </div>
                            )}
                            </div>

                            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                                <ul className="navbar-nav ">
                                {!loggedIn && (
                                    <div className="navbar-nav">
                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/iniciar-sesion"
                                        >
                                            Iniciar Sessión
                                        </NavLink>
                                        <NavLink
                                            className={({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''} navbar-text-white`}
                                            to="/crear-cuenta"
                                        >
                                            Crear Cuenta
                                        </NavLink>
                                    </div>
                                    )}
                                    {loggedIn && user && (
                                    <button className="nav-item nav-link btn navbar-text-white"onClick={handleLogOut}>
                                        <i className="fa-solid fa-right-from-bracket me-2"></i>
                                        Cerrar Sesión
                                    </button>
                                    
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>   
        </div>
    )
}


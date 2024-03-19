import { Route, Routes } from 'react-router-dom';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';
import CursosMain from '../components/gestion_cursos/CursosMain';
import GestionCursos from '../components/gestion_cursos/GestionCursos';
import About from '../pages/About/About';
import { HomePage } from '../ui/Hompage';
import MiPerfil from '../components/gestion_usuarios/MiPerfil';
import Students from '../pages/Students/Students';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAccountForm />} />
      <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/crear-cuenta" element={<CreateAccountForm />} />
      <Route path='/Cursos' element={<CursosMain />} />
      <Route path='/gestionar-cursos' element={<GestionCursos />} />
      <Route path='/About' element={<About />} />
      <Route path='/Students' element={<Students />} />
      <Route path='/mi-perfil' element={<MiPerfil />} />
    </Routes>
  )
}

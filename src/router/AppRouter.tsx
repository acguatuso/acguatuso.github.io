import { Route, Routes } from 'react-router-dom';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';
import CursosMain from '../components/gestion_cursos/CursosMain';
import GestionCursos from '../components/gestion_cursos/GestionCursos';
import About from '../pages/About/About';
import { HomePageApp } from '../pages/HomePage';
import MiPerfil from '../components/gestion_usuarios/MiPerfil';
import Students from '../pages/Students/Students';
import { MatriculaPage } from '../components/gestion_cursos';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAccountForm />} />
      <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
      <Route path="/home" element={<HomePageApp />} />
      <Route path="/crear-cuenta" element={<CreateAccountForm />} />
      <Route path='/Cursos' element={<CursosMain />} />
      <Route path='/gestionar-cursos' element={<GestionCursos />} />
      <Route path='/About' element={<About />} />
      <Route path='/Students' element={<Students />} />
      <Route path='/mi-perfil' element={<MiPerfil />} />
      <Route path='/matriculaAdmin' element={<MatriculaPage />}></Route>
    </Routes>
  )
}

import { Route, Routes } from 'react-router-dom';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';
import CursosMain from '../components/gestion_cursos/CursosMain';
import GestionCursos from '../components/gestion_cursos/GestionCursos';
import About from '../pages/About/About';
import { HomePageApp } from '../pages/HomePage';
import MiPerfil from '../components/gestion_usuarios/MiPerfil';
import Students from '../pages/Students/Students';
import { MatriculaPage, EvaluacionPage } from '../components/gestion_cursos';
import { Ads } from '../pages/Ads/Ads';
import { ServicePage } from '../pages/ServicesPage/ServicePage';

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePageApp />} />
        <Route path="/ucag-admin/" element={<LoginAccountForm />} />
        <Route path="/ucag-admin/iniciar-sesion" element={<LoginAccountForm />} />
        <Route path="/ucag-admin/home" element={<HomePageApp />} />
        <Route path="/ucag-admin/crear-cuenta" element={<CreateAccountForm />} />
        <Route path='/ucag-admin/Cursos' element={<CursosMain />} />
        <Route path='/ucag-admin/gestionar-cursos' element={<GestionCursos />} />
        <Route path='/ucag-admin/About' element={<About />} />
        <Route path='/ucag-admin/Students' element={<Students />} />
        <Route path='/ucag-admin/mi-perfil' element={<MiPerfil />} />
        <Route path='/ucag-admin/matriculaAdmin' element={<MatriculaPage />}></Route>
        <Route path='/ucag-admin/evaluacionEstudiantes' element={<EvaluacionPage />}></Route>
        <Route path='/ucag-admin/avisos' element={<Ads/>}></Route>
        <Route path='/ucag-admin/servicios' element={<ServicePage />}></Route>
      </Routes>
  )
}

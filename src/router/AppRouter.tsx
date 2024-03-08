import { Route, Routes } from 'react-router-dom';
import App from '../App';
import LoginAccountForm from '../components/gestion_usuarios/LoginAccForm';
import CreateAccountForm from '../components/gestion_usuarios/CreateAccForm';
import About from '../pages/About/About'
import { Navbar } from '../ui/components/Navbar';
export const AppRouter = () => {
  return (
    <>

        <Navbar />
    
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/iniciar-sesion" element={<LoginAccountForm />} />
          <Route path="/crear-cuenta" element={<CreateAccountForm />} />
          <Route path='/About' element={<About/>} />
          {/* Otras rutas */}
        </Routes>
    
    </>
  )
}

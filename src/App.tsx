import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'


function App() {

  return (
    <>
      
      <div className="card">
        <li>
          <Link to="/iniciar-sesion">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/crear-cuenta">Crear Cuenta</Link>
        </li>
      </div>
    </>
  )
}

export default App

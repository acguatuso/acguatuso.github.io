import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './redux/store.ts'; // Importa el store de Redux
import { BrowserRouter as Router} from 'react-router-dom';

import ToolbarHeader from './components/header/ToolbarHeader.tsx';
import { AppRouter } from './router/AppRouter.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve el componente Router(todos los componentes) con Provider y pasa el store */}
      <Router>
        <ToolbarHeader /> {/* Colocando tu ToolbarHeader aquí para que se renderice una unica vez*/}

        <h1>Unión Cantonal de Asociaciones de Guatuso</h1>
        <p>El mundo es un lugar hermoso y misterioso lleno de maravillas por descubrir. Cada día nos presenta nuevas oportunidades y desafíos, y depende de nosotros cómo los enfrentamos. La vida es un viaje emocionante, y cada paso que damos nos acerca un poco más a nuestros sueños y metas. A veces, es importante detenerse y disfrutar del momento presente, apreciando las pequeñas cosas que hacen que la vida sea especial. Así que levanta la cabeza, sonríe y sigue adelante con valentía, porque el mundo está lleno de posibilidades infinitas esperando ser exploradas.
        </p>
        <div className='modal'>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id='nombre' name='nombre'/>
          <button>Crear</button>
        </div> 
        <footer>Gracias por visitarnos!</footer>
        <AppRouter /> 
      </Router>
    </Provider>
  </React.StrictMode>,
)

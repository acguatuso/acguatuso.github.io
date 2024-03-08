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
        <AppRouter /> 
      </Router>
    </Provider>
  </React.StrictMode>,
)

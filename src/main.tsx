import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './redux/store.ts'; // Importa el store de Redux
import App from './App.tsx';
import { Homepage } from './components/Homepage.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve el componente App(todos los componentes) con Provider y pasa el store */}
      <Homepage />{/* <App/> */}
    </Provider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'; // Importa Provider desde react-redux
import store from './redux/store'; // Importa el store de Redux

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve el componente App con Provider y pasa el store */}
      <App />
    </Provider>
  </React.StrictMode>,
)

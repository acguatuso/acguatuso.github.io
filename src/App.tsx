import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'; // Importa los hooks necesarios
import { RootState } from './redux/store'; // Importa el tipo RootState
import { increment, decrement, incrementByAmount, decrementByAmount } from './redux/reducers/slice'; // Importa las acciones necesarias
import { useState } from 'react';

function App() {
  const count = useSelector((state: RootState) => state.counter.value); // Lee el valor del contador del estado global
  const dispatch = useDispatch(); // Obtiene la función dispatch del store
  const [amount, setIncrementAmount] = useState(1); 
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => dispatch(increment())}>{/*para ejecutar la action se usa dispatch(action())*/}
          count is {count}
        </button>
        <button onClick={() => dispatch(increment())}>Incrementar</button>
        <button onClick={() => dispatch(decrement())}>Decrementar</button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setIncrementAmount(parseInt(e.target.value))}
        />
        <button onClick={() => dispatch(incrementByAmount(amount))}>Incrementar</button>
        <button onClick={() => dispatch(decrementByAmount(amount))}>Decrementar</button>
        <p>Valor del contador: {count}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

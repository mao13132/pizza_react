/* import { Route, Routes } from 'react-router-dom'; */
import { MouseEvent } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input.';
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';




function App() {
  /* Если указать явно то TS сам определит тип переменной */
  /* const [counter, setCounter] = useState(0) */
  /* Или указать явнго*/
  /* const [counter, setCounter] = useState<number>() */

  const addCounter = (event: MouseEvent) => {
    console.log(event)
  };

  return (
    <>
      <Button onClick={addCounter}>Кнопка</Button>
      <Button appearence='big' onClick={addCounter}>Кнопка</Button>
      <Input placeholder='Email'/>

      

      {/* Старая версия роутеров так же в main идёт обёртка */}
      {/* <Routes>
        <Route path='/' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Error />} />
      </Routes> */}
      {/* Старая версия роутеров так же в main идёт обёртка */}
      

    </>
  )
}

export default App

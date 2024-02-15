import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
/* import { BrowserRouter } from 'react-router-dom'; */
import { Menu } from './pages/Menu/Menu';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Layout } from './layout/Layout/Layout.tsx'
import { Product } from './components/Product/Product.tsx'

import axios from "axios";
import { PREFIX } from './helpers/API.ts';

const MenuLazzy = lazy(() => import('./pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        /* Suspense позволяет что то покахзывать пока загружается ленивый компонент */
        element: <Suspense fallback={<>Загрузка</>}><MenuLazzy /></Suspense>
        /* element: <Menu /> */
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
       
            /* Имитация долгой загрузки */
            await new Promise<void>(resolve => {
              setTimeout(() => {
                  resolve();
              }, 2000);
          });
          /* Имитация долгой загрузки */

          const { data } = await axios.get(`${PREFIX}/products/${params.id}/`);
          return data;
        }
      }
    ]
  },
  {
    path: '*',
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />


    {/* Старые роутеры */}
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    {/* Старые роутеры */}
  </React.StrictMode>,
)

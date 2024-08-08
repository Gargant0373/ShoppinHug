import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Login from './pages/login';
import Shop from './pages/shop';
import CartDetail from './components/CartDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  }, {
    path: "/shop",
    element: <Shop />
  }, {
    path: "/cart/:cartName",
    element: <CartDetail />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

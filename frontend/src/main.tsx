import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartDetail from './components/CartDetail';
import './index.css';
import Login from './pages/login';
import CartList from './components/CartList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  }, {
    path: "/shop",
    element: <CartList />
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

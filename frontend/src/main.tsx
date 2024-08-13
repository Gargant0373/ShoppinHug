import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartDetail from './components/CartDetail';
import CartList from './components/CartList';
import './index.css';
import Login from './pages/Login';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)

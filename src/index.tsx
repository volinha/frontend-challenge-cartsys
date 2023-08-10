import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App';
import ErrorPage from './error-page';
import Home from './pages/home';
import Products from './pages/produtos';
import Client from './pages/clientes';
import Assistant from './pages/assistente';

import { Provider } from 'react-redux';
import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'home/',
    element: <Home />
  },
  {
    path: "produtos/",
    element: <Products />
  },
  {
    path: "clientes/",
    element: <Client />
  },
  {
    path: "assistente/",
    element: <Assistant />
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

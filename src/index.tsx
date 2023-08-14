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
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import Alert from './components/Alert';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: 'home/',
    element:
      <Navbar>
        <Home />
      </Navbar>
  },
  {
    path: "produtos/",
    element:
      <Navbar>
        <Products />
      </Navbar>
  },
  {
    path: "clientes/",
    element:
      <Navbar>
        <Client />
      </Navbar>
  },
  {
    path: "assistente/",
    element:
      <Navbar>
        <Assistant />
      </Navbar>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Alert />
          <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

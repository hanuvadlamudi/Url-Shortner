import React, { StrictMode } from 'react'; 
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Use Data API for loaders
import { Provider } from 'react-redux';
import store from './store/store.js'; 
import './index.css';
import NavbarLayout from './components/NavBarLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UrlShortenerUI from './components/UrlShortenerUI';
import Dashboard from './components/Dashboard.jsx';
import { authenticate } from './utils/Authenticate.js';

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      { path: "/", element: <UrlShortenerUI /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
      { path: "/dashboard", element: <Dashboard />, loader: authenticate },
      { path: "*", element: <div>404 - Not Found</div> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

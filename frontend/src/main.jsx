import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store.js';
import './index.css';

import NavbarLayout from './components/NavBarLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UrlShortenerUI from './components/UrlShortenerUI';
import Dashboard from './components/Dashboard.jsx';
import UserUrls from './components/UserUrls.jsx';
import RecentUrls from './components/RecentUrls.jsx'; // NEW: Add this import
import AnimatedPage from './components/AnimatedPage.jsx'; // NEW: Add this import if using animations

import { authenticate } from './utils/Authenticate.js';

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      { path: '/',          element: <UrlShortenerUI /> },
      { path: '/login',     element: <LoginForm    /> },
      { path: '/register',  element: <RegisterForm /> },
      { path: '/home',      element: <Dashboard    />, loader: authenticate },
      { path: '/dashboard', element: <UserUrls     />, loader: authenticate }, // NEW
      { path: '/recent-urls', element: <AnimatedPage><RecentUrls /></AnimatedPage>, loader: authenticate }, // NEW: Wrapped with AnimatedPage for sliding animation
      { path: '*',          element: <div>404 - Not Found</div> },
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

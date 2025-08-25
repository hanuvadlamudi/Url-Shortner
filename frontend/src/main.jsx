import React, { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import store from './store/store.js';
import './index.css';
import NavbarLayout from './components/NavBarLayout'; 
import { authenticate } from './utils/Authenticate.js'; 

const HomePage = lazy(() => import('./components/Home.jsx'));
const LoginPage = lazy(() => import('./components/LoginForm'));
const RegisterPage = lazy(() => import('./components/RegisterForm'));
const UrlShortenerPage = lazy(() => import('./components/UrlShortenerUI'));
const DashboardPage = lazy(() => import('./components/Dashboard.jsx'));
const RecentUrlsPage = lazy(() => import('./components/RecentUrls.jsx'));

const PageWrapper = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      { 
        path: '/', 
        element: <PageWrapper><UrlShortenerPage /></PageWrapper>
      },
      { 
        path: '/login', 
        element: <PageWrapper><LoginPage /></PageWrapper>
      },
      { 
        path: '/register', 
        element: <PageWrapper><RegisterPage /></PageWrapper>
      },
      { 
        path: '/home', 
        element: <PageWrapper><HomePage /></PageWrapper>, 
        loader: authenticate 
      },
      { 
        path: '/dashboard', 
        element: <PageWrapper><DashboardPage /></PageWrapper>, 
        loader: authenticate 
      },
      { 
        path: '/recent-urls', 
        element: (
          <PageWrapper>
            <RecentUrlsPage />
          </PageWrapper>
        ), 
        loader: authenticate 
      },
      { 
        path: '*', 
        element: <div>404 - Not Found</div> 
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

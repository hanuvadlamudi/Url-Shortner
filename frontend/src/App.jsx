import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarLayout from './components/NavBarLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UrlShortenerUI from './components/UrlShortenerUI';


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<UrlShortenerUI />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;

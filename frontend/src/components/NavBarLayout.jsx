import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const NavbarLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="w-full flex items-center justify-between py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg text-white">
        <div className="font-bold text-2xl tracking-wide">MyApp</div>
        <div className="hidden md:flex gap-8">
          <NavLink 
            to="/login" 
            className={({ isActive }) => 
              `hover:text-purple-200 transition duration-200 ${isActive ? 'text-purple-200 font-semibold border-b-2 border-purple-200' : ''}`
            }
          >
            Login
          </NavLink>
          <NavLink 
            to="/register" 
            className={({ isActive }) => 
              `hover:text-purple-200 transition duration-200 ${isActive ? 'text-purple-200 font-semibold border-b-2 border-purple-200' : ''}`
            }
          >
            Register
          </NavLink>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-indigo-500 text-white py-4">
          <NavLink to="/login" className="py-2 hover:text-purple-200" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
          <NavLink to="/register" className="py-2 hover:text-purple-200" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
        </div>
      )}
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarLayout;

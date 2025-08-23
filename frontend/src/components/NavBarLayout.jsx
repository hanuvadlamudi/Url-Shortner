import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/Auth.slice';

const NavbarLayout = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <NavLink to="/" className="text-2xl font-bold text-white hover:text-white/90 transition-colors duration-200">
                TinyRoute.ly
              </NavLink>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-2">
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out group cursor-pointer ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        Home
                        <span 
                          className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 ease-out ${
                            isActive 
                              ? 'w-full transform -translate-x-1/2' 
                              : 'w-0 group-hover:w-full transform -translate-x-1/2'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                  
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-out group cursor-pointer ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        Dashboard
                        <span 
                          className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-500 transition-all duration-300 ease-out ${
                            isActive 
                              ? 'w-full transform -translate-x-1/2' 
                              : 'w-0 group-hover:w-full transform -translate-x-1/2'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </>
              )}

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-6 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105 cursor-pointer backdrop-blur-sm"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <NavLink
                    to="/login"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl transition-all duration-200 hover:shadow-lg transform hover:scale-105 cursor-pointer backdrop-blur-sm"
                  >
                    Login
                  </NavLink>
                  
                  <NavLink
                    to="/register"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500/80 to-purple-500/80 hover:from-indigo-600 hover:to-purple-600 border border-white/20 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer backdrop-blur-sm"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </header>

      <Outlet />
    </>
  );
};

export default NavbarLayout;

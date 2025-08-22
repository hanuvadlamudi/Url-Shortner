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
      <header className="fixed top-0 left-0 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-between z-50">
        <NavLink to="/" className="text-3xl font-extrabold text-white">
          TinyRoute.ly
        </NavLink>

        <nav className="flex items-center space-x-6">
          {isAuthenticated && (
            <>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                  ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100' : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300'} hover:after:scale-x-100`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                  ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100' : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300'} hover:after:scale-x-100`
                }
              >
                Dashboard
              </NavLink>
              {/* <NavLink
                to="/recent-urls"
                className={({ isActive }) =>
                  `cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                  ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100' : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300'} hover:after:scale-x-100`
                }
              >
                Recent URLs
              </NavLink> */}
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                  ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100' : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300'} hover:after:scale-x-100`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `cursor-pointer relative text-white font-semibold pb-1 transition-all duration-300 ease-in-out
                  ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-100' : 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-300'} hover:after:scale-x-100`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default NavbarLayout;

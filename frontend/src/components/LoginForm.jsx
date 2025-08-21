import React, { useState } from 'react';
import { loginUser } from '../api/User.Api';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { login } from '../store/slice/Auth.slice';

const LoginForm = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.auth);
  console.log(auth);

  const submitHandler = async (e) => {
    e.preventDefault(); 
    try {
      const {user} = await loginUser(email, password);
      console.log(user);
      dispatch(login(user));
      navigate("/dashboard");
    } catch (error) {
      // Handle error (e.g., set an error state or show a message)
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg border border-gray-100 rounded-lg px-6 py-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={submitHandler}>
        <label className="block mb-4">
          <span className="block font-semibold mb-1">Email</span>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="block font-semibold mb-1">Password</span>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </label>
        <button
          type="submit"
          className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-3"
        >
          Sign In
        </button>
      </form>
      <div className="text-center mt-6 text-sm">
        Don&apos;t have an account?{' '}
        <NavLink 
          to="/register" 
          className={({ isActive }) => 
            `cursor-pointer text-blue-600 hover:underline ${isActive ? 'font-bold underline' : ''}`
          }
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default LoginForm;

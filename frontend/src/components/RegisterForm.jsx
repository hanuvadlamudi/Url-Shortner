import React, { useState } from 'react';
import { registerUser } from '../api/User.Api';
import { NavLink } from 'react-router-dom';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUserHandler = async (e) => {
    e.preventDefault(); // Prevents default form submission
    const result = await registerUser(fullName, email, password);
    console.log(result);
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white shadow-lg border border-gray-100 rounded-lg px-6 py-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={registerUserHandler}>
        <label className="block mb-4">
          <span className="block font-semibold mb-1">Full Name</span>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="User Name"
            required
          />
        </label>
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
          className="cursor-pointer w-full py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition mt-3"
        >
          Create Account
        </button>
      </form>
      <div className="text-center mt-6 text-sm">
        Already have an account?{' '}
        <NavLink 
          to="/login" 
          className={({ isActive }) => 
            `cursor-pointer text-blue-600 hover:underline ${isActive ? 'font-bold underline' : ''}`
          }
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};

export default RegisterForm;

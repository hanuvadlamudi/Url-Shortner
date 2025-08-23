import React, { useState } from 'react';
import { registerUser } from '../api/User.Api';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slice/Auth.slice';

const RegisterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUserHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { user } = await registerUser(fullName, email, password);
      dispatch(login(user));
      navigate("/home");
    } catch (error) {
      // Show error (optional)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-4">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
              <span className="text-sm font-bold text-white">T</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Join TinyRoute.ly</h2>
            <p className="text-white/70 text-xs">Create your account to get started</p>
          </div>

          <form onSubmit={registerUserHandler} className="space-y-3">
            {/* Full Name Field */}
            <div>
              <label className="text-xs font-medium text-white/90 mb-1 block">Full Name</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-xs font-medium text-white/90 mb-1 block">Email Address</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-xs font-medium text-white/90 mb-1 block">Password</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm text-sm"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Terms */}
            <p className="text-center text-xs text-white/60">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">Terms</a> and{' '}
              <a href="#" className="text-indigo-400 hover:text-indigo-300 underline">Privacy Policy</a>
            </p>

            {/* Login Link */}
            <div className="text-center pt-2 border-t border-white/20">
              <span className="text-xs text-white/60">Already have an account? </span>
              <NavLink to="/login" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                Sign In
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      const userData = await response.json();
      onLogin && onLogin(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white shadow-lg border border-gray-100 rounded-lg px-8 py-10 mt-12 sm:px-12 lg:px-20">
      <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-6">
          <span className="block font-semibold mb-2">Email</span>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={loading}
          />
        </label>
        <label className="block mb-6">
          <span className="block font-semibold mb-2">Password</span>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition mt-4 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && (
          <div className="text-red-600 mt-4 text-center">{error}</div>
        )}
      </form>
      <div className="text-center mt-8 text-sm">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-blue-600 hover:underline">Register</a>
      </div>
    </div>
  );
};

export default LoginForm;

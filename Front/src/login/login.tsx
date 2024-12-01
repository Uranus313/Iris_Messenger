import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Email: ${email}, Remember Me: ${rememberMe}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-12">
      {/* Logo */}
      <div className="text-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKLN_N2k8kVRsrwiXcdPuOx2Zothe2YfAz3w&s"
          alt="Telegram Logo"
          className="w-40  h-40 mx-auto mb-4 rounded-full"
        />
        <h1 className="text-2xl font-bold text-white">Sign in to Telegram</h1>
        <p className="text-sm text-gray-400 mt-2">
          Please enter your email address to log in.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="mt-8 bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-md space-y-6"
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="checkbox checkbox-indigo"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
            Keep me signed in
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Next
        </button>
      </form>

    </div>
  );
};

export default Login;

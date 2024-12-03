import React, { useState } from "react";

const SuperAdminLogin: React.FC = () => {
  // Define state types
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle form submission
  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setErrorMessage("❌ Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("❌ Please enter a valid email address.");
      return;
    }

    // Mock superadmin authentication logic
    if (email === "superadmin@example.com" && password === "supersecurepassword") {
      alert("✅ Login successful! Redirecting to the dashboard...");
      // Redirect logic (e.g., React Router)
    } else {
      setErrorMessage("❌ Invalid superadmin credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          SuperAdmin Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-warning w-full"
          >
            Login
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-center text-red-500">{errorMessage}</div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          For SuperAdmin use only.
        </p>
      </div>
    </div>
  );
};

export default SuperAdminLogin;

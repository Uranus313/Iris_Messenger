import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setMessage("❌ Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }

    // Simulate login logic (Replace this with actual API call)
    if (email === "admin@example.com" && password === "admin123") {
      setMessage("✅ Login successful!");
      // Redirect or handle admin dashboard logic
    } else {
      setMessage("❌ Invalid credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        {/* Admin Icon */}
        <div className="text-center mb-4 text-yellow-500">
          <i className="fas fa-user-shield text-5xl"></i>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-4">Admin Login</h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
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

          {/* Password Field */}
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
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div
            className={`mt-4 text-center ${
              message.includes("❌") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;

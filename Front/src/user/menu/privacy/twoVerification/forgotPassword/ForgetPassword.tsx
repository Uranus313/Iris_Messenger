import { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simulate sending recovery email (replace with actual API call)
    if (email) {
      setMessage(`✅ A recovery link has been sent to ${email}`);
    } else {
      setMessage("❌ Please enter a valid email address.");
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-900 text-white ">
      <div className="bg-gray-800 rounded-lg shadow-md p-6  w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-yellow-500 text-6xl">
            <i className="fas fa-envelope"></i>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">Forgot Password</h2>
        {/* Description */}
        <p className="text-center text-gray-400 mb-6">
          Enter your email address below to receive a password recovery link.
        </p>
        {/* Form */}
        <form onSubmit={handleForgotPassword} className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Send Recovery Link
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

export default ForgotPasswordPage;

import { useState } from "react";

const SetPassword = () => {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert("Password submitted: " + password); // Replace with actual submission logic
  };

  return (
    <div className="flex justify-center items-center  bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-md p-6 w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-yellow-500 text-6xl">
            <i className="fas fa-key"></i>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">Set Password</h2>
        {/* Description */}
        <p className="text-center text-gray-400 mb-6">
          Set password for Two-Step Verification
        </p>
        {/* Password Input */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;

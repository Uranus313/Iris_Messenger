import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validate inputs
    if (newPassword !== confirmPassword) {
      setMessage("❌ New password and confirmation do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("❌ Password should be at least 6 characters long.");
      return;
    }

    // Simulate password update (replace this with actual API logic)
    setMessage("✅ Password changed successfully!");
  };

  return (
    <div className="flex justify-center items-center  bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-md p-6  w-full">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="text-yellow-500 text-6xl">
            <i className="fas fa-key"></i>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-2">Change Password</h2>
        {/* Description */}
        <p className="text-center text-gray-400 mb-6">
          Update your Two-Step Verification password for added security.
        </p>

        {/* Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4">

          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">New Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="input input-bordered w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Confirm New Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Update Password
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

export default ChangePassword;

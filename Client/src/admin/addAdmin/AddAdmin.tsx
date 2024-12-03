import React, { useState } from "react";

interface AdminData {
  name: string;
  email: string;
  password: string;
}

const AddAdmin: React.FC = () => {
  const [formData, setFormData] = useState<AdminData>({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setErrorMessage("❌ Please fill in all fields.");
      setSuccessMessage("");
      return;
    }

    if (!email.includes("@")) {
      setErrorMessage("❌ Please enter a valid email address.");
      setSuccessMessage("");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("❌ Password must be at least 6 characters long.");
      setSuccessMessage("");
      return;
    }

    // Mock submission logic (Replace with real API call)
    console.log("New Admin Added:", formData);
    setErrorMessage("");
    setSuccessMessage(`✅ Admin ${name} has been added successfully!`);

    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex items-center justify-center  bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-400">
          Add New Admin
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Admin FirstName</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter admin name"
              className="input input-bordered w-full text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-400">Admin Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter admin email"
              className="input input-bordered w-full text-black"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              placeholder="Enter admin password"
              className="input input-bordered w-full text-black"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-warning w-full">
            Add Admin
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-4 text-center text-red-500">{errorMessage}</div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mt-4 text-center text-green-500">
            {successMessage}
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          SuperAdmin Panel - Add Admin
        </p>
      </div>
    </div>
  );
};

export default AddAdmin;

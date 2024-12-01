import { FormEvent, useState } from "react";

const SignUp = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    }
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    alert(`
      Profile Picture: ${profilePicture ? "Uploaded" : "Not Uploaded"}
      First Name: ${firstName}
      Last Name: ${lastName}
      Bio: ${bio}
    `);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-white">
          Create Your Account with email@example.com
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          Fill out the form below to create your account.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSignUp}
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md space-y-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-indigo-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 mb-4 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <label className="btn btn-sm btn-outline">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
            className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
            className="input input-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us a bit about yourself"
            className="textarea textarea-bordered w-full bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-indigo-600 text-white hover:bg-indigo-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

import React from "react";

const Editprofile = () => {
  return (
    <div className=" bg-gray-900 flex items-center justify-center">
      <div className="w-full  p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center  mb-6">
          {/* Back Icon */}
          <button className="btn bg-white me-3 btn-ghost text-lg text-white">
            <i className="fas fa-arrow-left"></i>
          </button>
          {/* Title */}
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
        </div>

        <div className="mt-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">+</span>
              </div>
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white text-sm"
              >
                +
                <input id="profile-pic" type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Name Input */}
          <label className="block mt-6 text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
          />

          {/* Last Name Input */}
          <label className="block mt-4 text-sm font-medium text-gray-400">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
          />

          {/* Bio Input */}
          <label className="block mt-4 text-sm font-medium text-gray-400">Bio (optional)</label>
          <textarea
            placeholder="Any details such as age, occupation, or city"
            className="w-full mt-1 textarea textarea-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
          />

          {/* Username Input */}
          <label className="block mt-4 text-sm font-medium text-gray-400">Username</label>
          <input
            type="text"
            placeholder="Username (optional)"
            className="w-full mt-1 input input-bordered bg-gray-700 text-white placeholder-gray-500 border-gray-600 focus:border-blue-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            You can choose a username on Telegram. If you do, people will be able to find you by this username and contact you without needing your phone number.
          </p>

          {/* Save Button */}
          <div className="mt-6">
            <button className="w-full btn btn-primary bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;

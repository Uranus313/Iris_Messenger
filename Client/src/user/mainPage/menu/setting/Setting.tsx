import React from "react";

const Setting = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div className="w-full flex items-center mb-6">
        {/* Back Button */}
        <button className="btn btn-ghost text-lg me-3 bg-white">
          <i className="fas fa-arrow-left"></i>
        </button>
        {/* Title */}
        <h1 className="text-xl font-bold">Settings</h1>

        {/* Action Buttons (right-aligned) */}
        <div className="ml-auto flex">
          <button className="btn btn-ghost text-lg bg-white">
            <i className="fas fa-ellipsis-v"></i>
          </button>
          <button className="btn btn-ghost text-lg bg-white ms-3">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-full flex flex-col items-center bg-gray-800 rounded-lg p-4 mb-6">
        <div className="avatar mb-4">
          <div className="w-24 rounded-full">
            <img src="https://via.placeholder.com/150" alt="User Profile" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">AmizZa</h2>
        <p className="text-gray-400 text-sm">last seen just now</p>
        <button className="btn btn-primary btn-circle mt-4">
          <i className="fas fa-camera"></i>
        </button>
      </div>

      {/* Contact Info */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-gray-400 py-2">
          <i className="fas fa-at"></i>
          <div className="flex-1 ml-4">
            <p className="text-white font-medium">amir@gmail.com</p>
            <p className="text-gray-500 text-sm">Email</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-400 py-2">
          <i className="fas fa-phone"></i>
          <div className="flex-1 ml-4">
            <p className="text-white font-medium">+98 935 790 1713</p>
            <p className="text-gray-500 text-sm">Phone</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-400 py-2">
          <i className="fas fa-at"></i>
          <div className="flex-1 ml-4">
            <p className="text-white font-medium">@AmirGhz17</p>
            <p className="text-gray-500 text-sm">Username</p>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="w-full">
        <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
          <i className="fas fa-bell"></i>
          <span className="ml-4 flex-1">Notifications and Sounds</span>
        </div>
        <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
          <i className="fas fa-database"></i>
          <span className="ml-4 flex-1">Data and Storage</span>
        </div>
        <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
          <i className="fas fa-lock"></i>
          <span className="ml-4 flex-1">Privacy and Security</span>
        </div>
        <div className="flex items-center justify-between py-3 text-gray-400 hover:text-white">
          <i className="fas fa-cogs"></i>
          <span className="ml-4 flex-1">General Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Setting;

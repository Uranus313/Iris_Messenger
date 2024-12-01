import React, { useState } from "react";

const App = () => {
  // States for settings
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState("medium");
  const [theme, setTheme] = useState("light");
  const [background, setBackground] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  return (
    <div className=" bg-gray-900 text-white">
      {/* Content Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center  mb-6">
          {/* Back Button */}
          <button className="btn btn-ghost text-lg text-white me-3">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-xl font-bold">General Settings</h1>
        </div>
        {/* Notifications */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Notifications</h2>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="checkbox checkbox-primary mr-3"
              />
              Enable Notifications
            </label>
          </div>
        </div>

        {/* Font Size */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Font Size</h2>
          <div className="flex items-center justify-between">
            <select
              className="select select-bordered bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Theme</h2>
          <div className="flex items-center justify-between">
            <select
              className="select select-bordered bg-gray-700 text-white border-gray-600 focus:border-blue-500"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
        </div>

        {/* Background Uploader */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Background</h2>
          <div className="flex flex-col items-center">
            <div
              className="w-full h-40 bg-cover bg-center rounded-lg mb-4"
              style={{
                backgroundImage: background
                  ? `url(${background})`
                  : "linear-gradient(to bottom, #2d3748, #1a202c)",
              }}
            >
              {!background && (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No background selected
                </div>
              )}
            </div>
            <label
              htmlFor="background-upload"
              className="btn btn-primary btn-sm"
            >
              Upload Background
              <input
                id="background-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

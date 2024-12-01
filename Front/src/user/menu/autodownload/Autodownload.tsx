import { useState } from "react";

const Autodownload = () => {
  // State to manage checkbox selections
  const [autoDownload, setAutoDownload] = useState({
    mobileData: true,
    wifi: false,
    roaming: false,
  });

  // Handle checkbox changes
  const handleCheckboxChange = (key: "mobileData" | "wifi" | "roaming") => {
    setAutoDownload((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center mb-6 ">
        {/* Back Button */}
        <button className="btn btn-ghost text-lg  me-3 text-white">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-xl font-bold">Data and Storage</h1>
      </div>

      {/* Content Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Usage Statistics */}

        {/* Auto-Download Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Auto-Download Media</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <label className="flex items-center text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={autoDownload.mobileData}
                onChange={() => handleCheckboxChange("mobileData")}
                className="checkbox checkbox-primary mr-3"
              />
              Using Mobile Data
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <label className="flex items-center text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={autoDownload.wifi}
                onChange={() => handleCheckboxChange("wifi")}
                className="checkbox checkbox-primary mr-3"
              />
              Using Wi-Fi
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <label className="flex items-center text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={autoDownload.roaming}
                onChange={() => handleCheckboxChange("roaming")}
                className="checkbox checkbox-primary mr-3"
              />
              While Roaming
            </label>
          </div>
        </div>
        {/* Clear Cache */}
        <div className="flex items-center justify-between py-4 border-t border-gray-700">
          <p className="text-sm">Clear Cache</p>
          <button className="btn btn-sm btn-error">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default Autodownload;

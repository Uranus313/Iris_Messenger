import { useState } from "react";

interface Props {
  goBack: () => void;
}

const Autodownload = ({ goBack }: Props) => {
  // State to manage checkbox selections
  const [autoDownload, setAutoDownload] = useState({
    AutoDownloadMedia: true,
  });

  // Handle checkbox changes
  const handleCheckboxChange = (key: "AutoDownloadMedia") => {
    setAutoDownload((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="min-h-screen bg-base-300 text-white p-4">
      {/* Header */}
      <div className="flex items-center mb-6 ">
        {/* Back Button */}
        <button
          onClick={() => goBack()}
          className="btn btn-ghost text-lg  me-3 text-white"
        >
          <i className="fas fa-arrow-left"></i>back
        </button>
        <h1 className="text-xl font-bold">Data and Storage</h1>
      </div>

      {/* Content Section */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        {/* Usage Statistics */}

        {/* Auto-Download Settings */}
        <div className="mb-6">

          <div className="flex items-center justify-between py-3 ">
            <label className="flex items-center text-gray-400 hover:text-white">
              <input
                type="checkbox"
                checked={autoDownload.AutoDownloadMedia}
                onChange={() => handleCheckboxChange("AutoDownloadMedia")}
                className="checkbox checkbox-primary mr-3"
              />
              Auto-Download Media
            </label>
          </div>

        </div>
        {/* Clear Cache */}
        <div className="flex items-center justify-between py-4 ">
          <p className="text-sm">Clear Cache</p>
          <button className="btn btn-sm btn-error">Clear</button>
        </div>

      </div>
      <p className=" text-sm text-base-300">
            Updated 10.4 September 29, 2024 Improved structure
          </p>
    </div>
  );
};

export default Autodownload;

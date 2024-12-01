import React from "react";

const Devices = () => {
  const sessions = [
    {
      type: "Telegram Android 11.1.3",
      device: "POCO POCO X3 NFC, 12 (31)",
      location: "Falkenstein, Germany",
      lastActive: "16:56",
    },
    {
      type: "Telegram Desktop 5.8.3",
      device: "FA507RR, Windows 11 x64",
      location: "Frankfurt am Main, Germany",
      lastActive: "Thu",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="btn btn-ghost btn-sm text-white">
          <span className="text-lg">←</span>
        </button>
        <h1 className="ml-4 text-lg font-semibold">Active Sessions</h1>
      </div>

      {/* Current Device */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-purple-400 text-sm font-semibold">This device</h2>
        <p className="mt-2 text-sm">Telegram Web 2.1.0 K</p>
        <p className="text-sm text-gray-400">Chrome 131, Windows</p>
        <p className="text-sm text-gray-400">Armenia</p>
        <button className="btn btn-outline btn-error w-full mt-4">
          Terminate All Other Sessions
        </button>
        <p className="mt-2 text-xs text-gray-400">
          Logs out all devices except for this one.
        </p>
      </div>

      {/* Active Sessions */}
      <h2 className="text-purple-400 text-sm font-semibold mb-2">
        Active sessions
      </h2>
      <div className="space-y-4">
        {sessions.map((session, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm">{session.type}</p>
              <p className="text-sm text-gray-400">{session.device}</p>
              <p className="text-sm text-gray-400">{session.location}</p>
            </div>
            <p className="text-sm text-gray-400">{session.lastActive}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-400">
        The official Telegram app is available for Android, iPhone, iPad,
        Windows, macOS, and Linux.
      </div>
    </div>
  );
};

export default Devices;

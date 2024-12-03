import React, { useState } from "react";

const Privacy = () => {
  // State to manage selections
  const [settings, setSettings] = useState({
    phoneNumber: "My Contacts",
    lastSeen: "Nobody",
    profilePhoto: "Everybody",
    bio: "Everybody",
    call: "Nobody",
    groupChats: "My Contacts",
  });

  // Update setting function
  const handleUpdate = (settingKey: string, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingKey]: value,
    }));
  };

  return (
    <div className=" bg-gray-900 text-white flex justify-center">
      <div className="w-full  bg-gray-800  shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-5">Privacy and Security</h2>

        <div className="space-y-4">
          {/* Blocked Users */}
          <div className="flex justify-between items-center">
            <span>Blocked Users</span>
            <button className="btn btn-warning btn-sm">Manage (196)</button>
          </div>

          {/* Two-Step Verification */}
          <div className="flex justify-between items-center">
            <span>Two-Step Verification</span>
            <button className="btn btn-success btn-sm">View</button>
          </div>

          {/* Active Sessions */}
          <div className="flex justify-between items-center">
            <span>Active Sessions</span>
            <button className="btn btn-info btn-sm">View (3)</button>
          </div>

          <hr className="my-4 border-gray-700" />

          {/* Privacy Settings with Dropdowns */}
          <div className="space-y-3">
            {Object.entries(settings).map(([key, value]) => (
              <div className="flex justify-between items-center" key={key}>
                <span className="capitalize">{`Who can see my ${key.replace(/([A-Z])/g, " $1").toLowerCase()}?`}</span>
                <div className="dropdown dropdown-top dropdown-end">
                  {/* Dropdown Button */}
                  <button tabIndex={0} className="btn btn-secondary btn-sm">
                    {value}
                  </button>
                  {/* Dropdown Options */}
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-gray-800 rounded-box w-40"
                  >
                    <li>
                      <button
                        onClick={() => handleUpdate(key, "Everybody")}
                        className={value === "Everybody" ? "bg-gray-600" : ""}
                      >
                        Everyone
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleUpdate(key, "My Contacts")}
                        className={
                          value === "My Contacts" ? "bg-gray-600" : ""
                        }
                      >
                        My Contacts
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleUpdate(key, "Nobody")}
                        className={value === "Nobody" ? "bg-gray-600" : ""}
                      >
                        No One
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

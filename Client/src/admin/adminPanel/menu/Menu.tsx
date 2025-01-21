import React from "react";

interface Props {
  activeTab: "users" | "reports" | "channels" | "groups";
  setActiveTab: React.Dispatch<React.SetStateAction<"users" | "reports" | "channels" | "groups">>;
}

const Menu=({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="bg-gray-800 w-60 min-h-screen p-4">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Admin Panel</h2>
      <div className="space-y-4">
        <button
          className={`btn btn-ghost w-full ${activeTab === "users" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`btn btn-ghost w-full ${activeTab === "reports" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("reports")}
        >
          Reports
        </button>
        <button
          className={`btn btn-ghost w-full ${activeTab === "channels" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("channels")}
        >
          Channels
        </button>
        <button
          className={`btn btn-ghost w-full ${activeTab === "groups" ? "bg-gray-700" : ""}`}
          onClick={() => setActiveTab("groups")}
        >
          Groups
        </button>
      </div>
    </div>
  );
};

export default Menu;

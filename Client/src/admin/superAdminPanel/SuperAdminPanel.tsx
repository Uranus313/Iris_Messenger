import React, { useState } from "react";
import AddAdmin from "./addAdmin/AddAdmin";
import AdminList from "./adminList/AdminList";

const SuperAdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"addAdmin" | "adminList">("addAdmin");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6 text-center">Super Admin Panel</h1>
          <button
            className="md:hidden absolute top-4 right-4 text-white text-xl"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav>
          <ul className="space-y-4 p-4">
            <li>
              <button
                onClick={() => {
                  setActiveTab("addAdmin");
                  setMenuOpen(false);
                }}
                className={`block text-left w-full ${
                  activeTab === "addAdmin" ? "text-blue-500" : "text-white"
                } hover:text-gray-300`}
              >
                Add Admin
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab("adminList");
                  setMenuOpen(false);
                }}
                className={`block text-left w-full ${
                  activeTab === "adminList" ? "text-blue-500" : "text-white"
                } hover:text-gray-300`}
              >
                Admin List
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4">
        {/* Hamburger Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          &#9776;
        </button>

        {/* Active Tab Content */}
        <div className="mt-16">
          {activeTab === "addAdmin" && <AddAdmin />}
          {activeTab === "adminList" && <AdminList />}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;

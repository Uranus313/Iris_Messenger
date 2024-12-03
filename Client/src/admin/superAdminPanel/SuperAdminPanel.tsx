import React, { useState } from "react";
import AddAdmin from "../addAdmin/AddAdmin";

const SuperAdminPanel: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("dashboard");

  // Menu Options
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "add-admin", label: "Add Admin" },
  ];

  // Add Admin Form State
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminData.name || !adminData.email || !adminData.role) {
      alert("Please fill all fields.");
      return;
    }
    alert(
      `Admin ${adminData.name} added successfully with role: ${adminData.role}`
    );
    setAdminData({ name: "", email: "", role: "" });
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700 text-center">
          Admin Panel
        </h1>
        <nav className="flex-grow">
          <ul className="menu p-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={
                  activePage === item.id ? "bg-gray-700 rounded-lg" : ""
                }
              >
                <button
                  className="text-left w-full p-2 hover:bg-gray-700 rounded-lg"
                  onClick={() => setActivePage(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6">
        {activePage === "dashboard" && (
          <h2 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h2>
        )}

        {activePage === "add-admin" && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
            <AddAdmin />
          </div>
        )}

      </main>
    </div>
  );
};

export default SuperAdminPanel;

import React, { useState } from "react";

const UserList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBan = (userId: number) => {
    // Implement your ban logic here
    console.log(`User with ID ${userId} has been banned.`);
    alert(`User with ID ${userId} has been banned.`);
  };

  return (
    <div className="scroll">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />
      <ul className="space-y-4">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg"
          >
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <img
                src={user.profilePicture}
                alt={`${user.name} profile`}
                className="w-12 h-12 rounded-full object-cover overflow-hidden"
              />
              {/* User Info */}
              <div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
            {/* Ban Button */}
            <button
              onClick={() => handleBan(user.id)}
              className="btn bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
            >
              Ban
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

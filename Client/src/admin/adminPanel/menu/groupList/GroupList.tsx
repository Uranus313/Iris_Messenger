import React, { useState } from "react";

const GroupList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const groups = [
    {
      id: 1,
      name: "Developers",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
    {
      id: 2,
      name: "Gaming",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
    {
      id: 3,
      name: "Photography Enthusiasts",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
  ];

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBan = (groupId: number) => {
    // Implement your ban logic here
    console.log(`Group with ID ${groupId} has been banned.`);
    alert(`Group with ID ${groupId} has been banned.`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Groups</h2>
      <input
        type="text"
        placeholder="Search groups"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />
      <ul className="space-y-4">
        {filteredGroups.map((group) => (
          <li
            key={group.id}
            className="flex items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg"
          >
            {/* Group Profile Picture */}
            <div className="flex items-center gap-4">
              <img
                src={group.profilePicture}
                alt={`${group.name} group`}
                className="w-12 h-12 rounded-full object-cover overflow-hidden"
              />
              {/* Group Info */}
              <div>
                <p className="font-medium text-white">{group.name}</p>
              </div>
            </div>
            {/* Ban Button */}
            <button
              onClick={() => handleBan(group.id)}
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

export default GroupList;

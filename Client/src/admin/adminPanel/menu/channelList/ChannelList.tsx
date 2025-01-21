import React, { useState } from "react";

const ChannelList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const channels = [
    {
      id: 1,
      name: "Tech News",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
    {
      id: 2,
      name: "Sports Updates",
      profilePicture: "https://via.placeholder.com/150", // Example profile picture URL
    },
  ];

  const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBan = (channelId: number) => {
    // Implement your ban logic here
    console.log(`Channel with ID ${channelId} has been banned.`);
    alert(`Channel with ID ${channelId} has been banned.`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Channels</h2>
      <input
        type="text"
        placeholder="Search channels"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full bg-gray-800 text-white placeholder-gray-500 mb-4"
      />
      <ul className="space-y-4">
        {filteredChannels.map((channel) => (
          <li
            key={channel.id}
            className="flex items-center justify-between gap-4 bg-gray-800 p-4 rounded-lg"
          >
            {/* Profile Picture */}
            <div className="flex items-center gap-4">
              <img
                src={channel.profilePicture}
                alt={`${channel.name} profile`}
                className="w-12 h-12 rounded-full object-cover overflow-hidden"
              />
              {/* Channel Name */}
              <div>
                <p className="font-bold text-white">{channel.name}</p>
              </div>
            </div>
            {/* Ban Button */}
            <button
              onClick={() => handleBan(channel.id)}
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

export default ChannelList;

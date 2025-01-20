const Blockedusers = () => {
  // Sample blocked users list
  const users = [
    {
      name: "Deleted Account",
      username: null,
      status: "last seen a long time ago",
    },
    { name: "Kingclub", username: "v2rray11_Ng_bot", status: "" },
    { name: "دانلود کده", username: "cinemarisessplusbot", status: "" },
    { name: "Evolved Fights", username: "EvolvedFightshot_bot", status: "" },
  ];

  return (
    <div className="min-h-screen bg-base-300 text-white flex flex-col">
      {/* Header */}
      <header className="bg-base-300 p-4">
        <h1 className="text-2xl font-bold">Blocked Users</h1>
        <p className="text-sm text-gray-400">
          Blocked users can't send you messages or add you to groups. They will
          not see your profile photos, stories, online, and last seen status.
        </p>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <ul className="divide-y divide-gray-700">
          {users.map((user, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-800"
            >
              {/* User Info */}
              <div className="flex items-center space-x-4">
                {/* Profile Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl font-bold">
                  {user.name.charAt(0)}
                </div>

                {/* User Details */}
                <div>
                  <p className="font-medium">{user.name}</p>
                  {user.username ? (
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  ) : (
                    <p className="text-sm text-gray-400">{user.status}</p>
                  )}
                </div>
              </div>

              {/* Action */}
              <button className="btn btn-sm btn-error">Unblock</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Action Button */}
      <button className="btn btn-circle btn-primary fixed bottom-5 right-5">
        +
      </button>
      <p className=" text-sm text-base-300">
            Updated 10.4 September 29, 2024 Improved structure
          </p>
    </div>
  );
};

export default Blockedusers;

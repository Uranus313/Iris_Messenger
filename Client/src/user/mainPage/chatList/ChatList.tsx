import { useState } from "react";
import sth from "../../../assets/345974-200 .png"

const ChatList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content flex flex-col">
      {/* Top Navigation Bar */}
      <div className="px-4 py-2 bg-base-100 flex items-center justify-between">
        <div className="relative">
          <button onClick={toggleMenu} className="btn btn-ghost text-lg mt-4">
            <img
              src={sth}
              alt=""
              className=" fixed"
            />
          </button>
          {isMenuOpen && (
            <div className="absolute top-12 left-0 bg-base-100 shadow-lg rounded-md w-48 mt-4">
              <ul className="menu menu-compact p-2 bg-base-200 rounded-md">
                <li className=" hover:bg-base-300">
                  <a href="#">Contact</a>
                </li>
                <li className="hover:bg-base-300">
                  <a href="#">Settings</a>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Search Bar */}
        <div className="px-4 py-2 mt-2 ">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
        <h1 className="text-xl font-bold">Chats</h1>
      </div>

      {/* Tabs */}
      <div className="bg-base-100 flex justify-around border-b border-base-200 py-2">
        <button className="">All</button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 flex items-center hover:bg-base-100">
          <div className="">
            <div className="w-12 rounded-full">
              <img src="https://via.placeholder.com/150" alt="Chat Avatar" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">Archived Chats</h2>
            <p className="text-xs text-gray-500">PlaylistMa, Playlist...</p>
          </div>
          <span className="badge badge-primary">258</span>
        </div>

        <div className="px-4 py-3 flex items-center hover:bg-base-100">
          <div className="">
            <div className="w-12 rounded-full">
              <img src="https://via.placeholder.com/150" alt="Chat Avatar" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">Music</h2>
            <p className="text-xs text-gray-500">Deltangi ~ Guitar Music</p>
          </div>
          <span className="text-xs text-gray-500">Fri</span>
        </div>

        <div className="px-4 py-3 flex items-center hover:bg-base-100">
          <div className="">
            <div className="w-12 rounded-full">
              <img src="https://via.placeholder.com/150" alt="Chat Avatar" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-sm font-semibold">Pluviophile</h2>
            <p className="text-xs text-gray-500">Modem nist be emtehan...</p>
          </div>
          <span className="text-xs text-gray-500">Sun</span>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-base-100 p-4 flex justify-around md:hidden">
        <button className="btn btn-ghost">
          <i className="fas fa-comment-alt"></i>
        </button>
        <button className="btn btn-ghost">
          <i className="fas fa-user-friends"></i>
        </button>
        <button className="btn btn-ghost">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatList;

import { useState } from "react";
import sth from "../../../assets/345974-200 .png";
import { Channel, Direct, Group } from "../../../interfaces/interfaces";
import ChannelsChat from "./channelsChat/ChannelsChat";
import DirectsChat from "./directsChat/DirectsChat";
import GroupsChat from "./groupsChat/GroupsChat";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
  setSidebarState: (
    nextState: "settings" | "contacts" | "addGroup" | "addChannel"
  ) => void;
}

const ChatList = ({ setSidebarState, setSelectedChat }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    "directs" | "channels" | "groups"
  >("directs");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="md:block bg-base-300 text-base-content flex flex-col scroll-my-60">
      <div>
        {/* Top Navigation Bar */}
        <div className="px-4 py-2 bg-base-100 flex items-center">
          <div className=" ">
            <button onClick={toggleMenu} className="text-lg mt-4">
              <img src={sth} alt="" className=" " />
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 left-0 bg-base-100 shadow-lg rounded-md w-48 mt-4">
                <ul className="menu menu-compact p-2 bg-base-200 rounded-md">
                  <li className=" hover:bg-base-300">
                    <button onClick={() => setSidebarState("contacts")}>
                      Contact
                    </button>
                  </li>
                  <li className=" hover:bg-base-300">
                    <button onClick={() => setSidebarState("addGroup")}>
                      Add Group
                    </button>
                  </li>
                  <li className=" hover:bg-base-300">
                    <button onClick={() => setSidebarState("addChannel")}>
                      Add Channel
                    </button>
                  </li>
                  <li className="hover:bg-base-300">
                    <button onClick={() => setSidebarState("settings")}>
                      Settings
                    </button>
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
              className="input input-bordered "
            />
          </div>
          <h1 className="text-xl font-bold">Chats</h1>
        </div>
        {/* Tabs */}
        <div className="bg-base-100 flex justify-around border-b border-base-200 py-2">
          <button onClick={() => setSelectedTab("directs")}>Directs</button>
          <button onClick={() => setSelectedTab("groups")}>Groups</button>
          <button onClick={() => setSelectedTab("channels")}>Channels</button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center hover:bg-base-100">
          {selectedTab == "directs" && (
            <DirectsChat setSelectedChat={setSelectedChat} />
          )}
          {selectedTab == "channels" && (
            <ChannelsChat setSelectedChat={setSelectedChat} />
          )}
          {selectedTab == "groups" && (
            <GroupsChat setSelectedChat={setSelectedChat} />
          )}
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

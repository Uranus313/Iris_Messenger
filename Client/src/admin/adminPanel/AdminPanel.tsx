import { useState } from "react";
import ChannelList from "./menu/channelList/ChannelList";
import GroupList from "./menu/groupList/GroupList";
import Menu from "./menu/Menu";
import ReportList from "./menu/reportList/ReportList";
import UserList from "./menu/userList/UserList";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "users" | "reports" | "channels" | "groups"
  >("users");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex bg-gray-900 w-full h-full">
      {/* Sidebar */}
      <div
        className={`md:block ${
          menuOpen ? "block" : "hidden"
        } fixed md:static z-50 bg-gray-800 h-full w-64`}
      >
        <Menu activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          className="md:hidden absolute top-4 right-4 text-white text-xl"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-900 text-white mt-16 overflow-scroll">
        {/* Hamburger Menu Button */}
        <div className="bg-gray-900 block z-0 overflow-scroll fixed">
          <button
            className="md:hidden fixed top-4 left-4 text-white text-2xl mb-2"
            onClick={() => setMenuOpen(true)}
          >
            &#9776;
          </button>
        </div>

        {/* Dynamic Content */}
        {activeTab === "users" && <UserList />}
        {activeTab === "reports" && <ReportList />}
        {activeTab === "channels" && <ChannelList />}
        {activeTab === "groups" && <GroupList />}
      </div>
    </div>
  );
};

export default AdminPanel;

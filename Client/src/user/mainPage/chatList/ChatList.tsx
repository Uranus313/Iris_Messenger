import { useState } from "react";
import sth from "../../../assets/345974-200 .png";
import { Channel, Direct, Group } from "../../../interfaces/interfaces";
import ChannelsChat from "./channelsChat/ChannelsChat";
import DirectsChat from "./directsChat/DirectsChat";
import GroupsChat from "./groupsChat/GroupsChat";
import { Core_api_Link } from "../../../consts/APILink";
import { useMutation } from "@tanstack/react-query";
import AllChat from "./allChat/AllChat";

interface Props {
  setSelectedChat: (nextState: Group | Channel | Direct | null) => void;
  setSelectedChatStatus: (
    nextState: "group" | "channel" | "direct" | null
  ) => void;
  setSidebarState: (
    nextState: "settings" | "contacts" | "addGroup" | "addChannel"
  ) => void;
}

const ChatList = ({
  setSidebarState,
  setSelectedChat,
  setSelectedChatStatus,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userGroupsSearched, setGroupsSearched] = useState<Group[]>([]);
  const [userChannelsSearched, setChannelsSearched] = useState<Channel[]>([]);
  const [error, setError] = useState<string | null>();
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState<
    "directs" | "channels" | "groups" | "all"
  >("all");
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const groupsSearch = useMutation({
    mutationFn: async (str: string) => {
      const result = await fetch(
        Core_api_Link + `groups/?textSearch=${encodeURIComponent(str)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: (result) => {
      setGroupsSearched(result.data);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const handleGroupsSearch = (e: any) => {
    setSearchValue(e.target.value);
    const str = e.target.value;
    if (str == "" || str == null) {
      setGroupsSearched([]);
    } else {
      groupsSearch.mutate(str);
    }
  };
  const channelsSearch = useMutation({
    mutationFn: async (str: string) => {
      const result = await fetch(
        Core_api_Link + `channels/?textSearch=${encodeURIComponent(str)}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonResult = await result.json();
      if (result.ok) {
        return jsonResult;
      } else {
        throw new Error(jsonResult.message);
      }
    },
    onSuccess: (result) => {
      setChannelsSearched(result.data);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const handleChannelSearch = (e: any) => {
    setSearchValue(e.target.value);
    const str = e.target.value;
    if (str == "" || str == null) {
      setChannelsSearched([]);
    } else {
      channelsSearch.mutate(str);
    }
  };

  return (
    <div className="md:block bg-base-300 text-base-content flex flex-col scroll-my-60">
      <div>
        {/* Top Navigation Bar */}
        <div
          className={"px-4 py-2 bg-base-100 flex items-center justify-between"}
        >
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
          {selectedTab != "directs" && selectedTab != "all" && (
            <div className="px-4 py-2 mt-2 text-white">
              <input 
                value={searchValue}
                onChange={
                  selectedTab == "groups"
                    ? handleGroupsSearch
                    : selectedTab == "channels"
                    ? handleChannelSearch
                    : () => {}
                }
                type="text"
                placeholder="Search"
                className="input input-bordered text-white"
              />
            </div>
          )}
          <h1 className="text-xl font-bold text-white">Chats</h1>
        </div>
        {/* Tabs */}
        <div className="bg-base-100 flex justify-around border-b border-base-200 py-2 text-white">
          <button
            onClick={() => {
              setSelectedTab("all");
              setChannelsSearched([]);
              setGroupsSearched([]);
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setSelectedTab("directs");
              setChannelsSearched([]);
              setGroupsSearched([]);
            }}
          >
            Directs
          </button>
          <button
            onClick={() => {
              setSelectedTab("groups");
              setChannelsSearched([]);
              setGroupsSearched([]);
              setSearchValue("");
            }}
          >
            Groups
          </button>
          <button
            onClick={() => {
              setSelectedTab("channels");
              setGroupsSearched([]);
              setChannelsSearched([]);
              setSearchValue("");
            }}
          >
            Channels
          </button>
        </div>
      </div>
      {error && error}
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center hover:bg-base-100">
          {selectedTab == "directs" && (
            <DirectsChat
              setSelectedChat={setSelectedChat}
              setSelectedChatStatus={setSelectedChatStatus}
            />
          )}
          {selectedTab == "channels" && (
            <ChannelsChat
              setSelectedChat={setSelectedChat}
              userChannelsSearched={userChannelsSearched}
              setSelectedChatStatus={setSelectedChatStatus}
            />
          )}
          {selectedTab == "groups" && (
            <GroupsChat
              setSelectedChat={setSelectedChat}
              userGroupsSearched={userGroupsSearched}
              setSelectedChatStatus={setSelectedChatStatus}
            />
          )}
          {selectedTab == "all" && (
            <AllChat
              setSelectedChat={setSelectedChat}
              setSelectedChatStatus={setSelectedChatStatus}
            />
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
      <p className=" text-sm text-base-300">
        Up dated 10 . 4 Sep tem ber 29 , 20 24 Imp roved struc tureee
      </p>
    </div>
  );
};

export default ChatList;

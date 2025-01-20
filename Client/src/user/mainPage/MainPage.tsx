import { useEffect, useState } from "react";
import sth from "../../assets/Background.png";
import { Channel, Direct, Group } from "../../interfaces/interfaces";
import ChannelPage from "./chat/channelPage/ChannelPage";
import DirectPage from "./chat/directPage/DirectPage";
import GroupPage from "./chat/groupPage/GroupPage";
import ChatList from "./chatList/ChatList";
import AddChannel from "./menu/addChannel/AddChannel";
import AddGroup from "./menu/addGroup/AddGroup";
import Contact from "./menu/contacts/Contact";
import Setting from "./menu/setting/Setting";

const MainPage = () => {
  let [chatList, setChatList] = useState<boolean>(true);
  let [selectedChat, setSelectedChat] = useState<
    Group | Channel | Direct | null
  >(null);
  let [SidebarState, setSidebarState] = useState<
    "chatlist" | "settings" | "contacts" | "addChannel" | "addGroup"
  >("chatlist");
  useEffect(() => {
    if (selectedChat) {
      setChatList(false);
    }
  }, [selectedChat]);
  return (
    <div className="flex ">
      {/* Sidebar for Chat List */}
      <div
        className={
          !chatList
            ? "flex-none  bg-base-300  md:block " + "hidden"
            : "flex-grow bg-base-300  md:block md:flex-none"
        }
      >
        {SidebarState == "chatlist" && (
          <ChatList
            setSidebarState={setSidebarState}
            setSelectedChat={setSelectedChat}
          />
        )}
        {SidebarState == "settings" && (
          <Setting goBack={() => setSidebarState("chatlist")} />
        )}
        {SidebarState == "contacts" && (
          <Contact goBack={() => setSidebarState("chatlist")} />
        )}
        {SidebarState == "addGroup" && (
          <AddGroup goBack={() => setSidebarState("chatlist")} />
        )}
        {SidebarState == "addChannel" && (
          <AddChannel goBack={() => setSidebarState("chatlist")} />
        )}
      </div>
      {/* Main Chat Area */}

      <div
        className={
          !chatList
            ? "flex-grow  bg-base-200  md:block md:basis-3/4"
            : "flex-grow bg-base-200  md:block " + "hidden"
        }
      >
        {selectedChat?.status == "direct" && (
          <DirectPage
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
            }}
          />
        )}
        {selectedChat?.status == "group" && (
          <GroupPage
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
            }}
          />
        )}
        {selectedChat?.status == "channel" && (
          <ChannelPage
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
            }}
          />
        )}
        {!selectedChat && (
          <div
            className="flex justify-center items-center h-screen"
            style={{
              backgroundImage: `url(${sth})`,
              backgroundSize: "cover",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
          >
            No Chat Selected...
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

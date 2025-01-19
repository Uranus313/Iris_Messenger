import { useState } from "react";
import Chat from "./chat/Chat";
import ChatList from "./chatList/ChatList";
import Contact from "./menu/contacts/Contact";
import Setting from "./menu/setting/Setting";

const MainPage = () => {
  let [chatList, setChatList] = useState<boolean>(false);
  let [selectedChat, setSelectedChat] = useState<string | null>("test");
  let [SidebarState, setSidebarState] = useState<
    "chatlist" | "settings" | "contacts"
  >("chatlist");
  return (
    <div className="flex  ">
      {/* Sidebar for Chat List */}
      <div
        className={
          !chatList
            ? "flex-none  bg-base-300  md:block " + "hidden"
            : "flex-grow bg-base-300  md:block md:flex-none"
        }
      >
        {SidebarState == "chatlist" && (
          <ChatList setSidebarState={setSidebarState} />
        )}
        {SidebarState == "settings" && (
          <Setting goBack={() => setSidebarState("chatlist")} />
        )}
        {SidebarState == "contacts" && (
          <Contact goBack={() => setSidebarState("chatlist")} />
        )}
      </div>
      {/* Main Chat Area */}

      <div
        className={
          !chatList
            ? "flex-grow  bg-base-200  md:block "
            : "flex-grow bg-base-200  md:block " + "hidden"
        }
      >
        <Chat
          showChatList={() => {
            setChatList(true);
            setSelectedChat(null);
          }}
          chatList={chatList}
          user1={selectedChat}
          user2={selectedChat}
        />
      </div>
    </div>
  );
};

export default MainPage;

import { useState } from "react";
import Chat from "./chat/Chat";
import ChatList from "./chatList/ChatList";

const MainPage = () => {
  let [chatList, setChatList] = useState<boolean>(false);
  let [selectedChat, setSelectedChat] = useState<string | null>("test");
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
        <ChatList />
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

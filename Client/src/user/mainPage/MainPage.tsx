import { useEffect, useState } from "react";
import sth from "../../assets/Background.png";
import { Channel, Direct, Group, Message } from "../../interfaces/interfaces";
import ChannelPage from "./chat/channelPage/ChannelPage";
import DirectPage from "./chat/directPage/DirectPage";
import GroupPage from "./chat/groupPage/GroupPage";
import ChatList from "./chatList/ChatList";
import AddChannel from "./menu/addChannel/AddChannel";
import AddGroup from "./menu/addGroup/AddGroup";
import Contact from "./menu/contacts/Contact";
import Setting from "./menu/setting/Setting";

import { io, Socket } from "socket.io-client";
import { Web_Socket_Link } from "../../consts/APILink";
import JoinChannel from "./menu/addChannel/joinChannel/JoinChannel";
import JoinGroup from "./chatList/groupsChat/joinGroup/JoinGroup";
export interface KeyType {
  _id: string;
  type: string;
}
export const serializeKey = (key: KeyType): string => `${key.type}:${key._id}`;
const MainPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  // const [connected, setConnected] = useState(false);
  let [chatList, setChatList] = useState<boolean>(true);
  let [selectedChat, setSelectedChat] = useState<
    Group | Channel | Direct | null
  >(null);
  let [selectedChatStatus, setSelectedChatStatus] = useState<
    "group" | "channel" | "direct" | null
  >(null);
  let [SidebarState, setSidebarState] = useState<
    | "chatlist"
    | "settings"
    | "contacts"
    | "addChannel"
    | "addGroup"
    | "joinGroup"
    | "joinChannel"
  >("chatlist");
  let [messageMap, setMessageMap] = useState<Map<string, any[]>>(new Map());
  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io(Web_Socket_Link, {
      path: "/ws",
      withCredentials: true,
      secure: true,
      rejectUnauthorized: false,
    });

    // Event listeners
    // newSocket.on("connect", () => {
    //   console.log("Connected to WebSocket server");
    //   setConnected(true);
    // });

    // newSocket.on("disconnect", () => {
    //   console.log("Disconnected from WebSocket server");
    //   setConnected(false);
    // });

    newSocket.on("newMessage", (data: any) => {
      console.log("Message received:", data);
      if (data.directId) {
        addMessage({ _id: data.directId, type: data.messageType }, data);
      } else if (data.groupId) {
        addMessage({ _id: data.groupId, type: data.messageType }, data);
      } else if (data.channelId) {
        addMessage({ _id: data.channelId, type: data.messageType }, data);
      }
    });
    newSocket.on("messageSent", (data: any) => {
      console.log("Message received:", data);
      if (data.directId) {
        addMessage({ _id: data.directId, type: data.messageType }, data);
      } else if (data.groupId) {
        addMessage({ _id: data.groupId, type: data.messageType }, data);
      } else if (data.channelId) {
        addMessage({ _id: data.channelId, type: data.messageType }, data);
      }
    });

    // Error handling
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    setSocket(newSocket);

    // Clean up connection on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const addMessage = (key: KeyType, message: Message) => {
    // Create a key
    const serializedKey = serializeKey(key);
    // Add a value to the map
    setMessageMap((prevMap) => {
      // Clone the previous Map
      const newMap = new Map(prevMap);

      // Get the existing messages or initialize an empty array
      const oldMessages = newMap.get(serializedKey) || [];

      // Add the new message
      newMap.set(serializedKey, [message, ...oldMessages]);

      return newMap; // Update the state with the new Map
    });
  };
  const sendMessage = (sendingMessage: any) => {
    socket?.emit("sendMessage", sendingMessage);
  };
  useEffect(() => {
    if (selectedChat) {
      setChatList(false);
      console.log(selectedChatStatus);
      console.log(selectedChat);
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
            setSelectedChatStatus={setSelectedChatStatus}
          />
        )}
        {SidebarState == "settings" && (
          <Setting
            goBack={() => {
              setSidebarState("chatlist");
            }}
          />
        )}
        {SidebarState == "contacts" && (
          <Contact
            goBack={() => {
              setSidebarState("chatlist");
            }}
          />
        )}
        {SidebarState == "addGroup" && (
          <AddGroup
            goBack={() => {
              setSidebarState("chatlist");
            }}
          />
        )}
        {SidebarState == "addChannel" && (
          <AddChannel
            goBack={() => {
              setSidebarState("chatlist");
            }}
          />
        )}
        {SidebarState == "joinChannel" && (
          <JoinChannel
            channel={selectedChat as Channel}
            goBack={() => {
              setSidebarState("chatlist");
              setSelectedChat(null);
            }}
          />
        )}
        {SidebarState == "joinGroup" && (
          <JoinGroup
            group={selectedChat as Group}
            goBack={() => {
              setSidebarState("chatlist");
              setSelectedChat(null);
            }}
          />
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
        {selectedChatStatus == "direct" && (
          <DirectPage
            direct={selectedChat as Direct}
            messageMap={messageMap}
            sendMessage={sendMessage}
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
              setSelectedChatStatus(null);
            }}
          />
        )}
        {selectedChatStatus == "group" && (
          <GroupPage
            group={selectedChat as Group}
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
              setSelectedChatStatus(null);
            }}
          />
        )}
        {selectedChatStatus == "channel" && (
          <ChannelPage
            channel={selectedChat as Channel}
            showChatList={() => {
              setChatList(true);
              setSelectedChat(null);
              setSelectedChatStatus(null);
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

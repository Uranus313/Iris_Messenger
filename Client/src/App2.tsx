// Import the necessary libraries
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Web_Socket_Link } from "./consts/APILink";

const SOCKET_SERVER_URL = "https://192.168.151.23:3003"; // Replace with your server URL

const ChatApp = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Connect to the server when the component mounts
  useEffect(() => {
    const socketIo = io(SOCKET_SERVER_URL, {
      path: "/ws",
      secure: true,
      rejectUnauthorized: false,
    });

    setSocket(socketIo);

    // Listen for incoming messages
    socketIo.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Send a message to the server
  const sendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatApp;

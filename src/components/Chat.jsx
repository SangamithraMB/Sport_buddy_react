/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import socket from "./socket";
import { useAuth } from "./AuthContext";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const groupChatId = props.roomId;
  const [room, setRoom] = useState(groupChatId);
  // const receiverId = props.receiverId;
  let [joined, setJoined] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const { receiverId, senderId} = useParams();


  useEffect(() => {
    if (user?.firstName || !receiverId || joined) {
      console.log(receiverId, senderId)
      if (!room) {
        const privateRoomId = [user.userId, receiverId].sort((a, b) => a - b).join("_");
        socket.emit("join_room", { username: user.firstName, room: privateRoomId, token });
        setRoom(privateRoomId);
      } else {
        socket.emit("join_room", { username: user.firstName, room, token });
      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }

      const messageListener = (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);

        if (Notification.permission === "granted" && data.sender !== user.firstName) {
          new Notification(`New message from ${data.sender}`, {
            body: data.message,
            icon: "/chat-icon.png",
          });
        }
      };

      socket.on("receive_message", messageListener);
      socket.on("chat_history", (data) => {
        setMessages((prevMessages) => [...data.messages, ...prevMessages]);
      });

      socket.on("room_joined", (data) => {
        messageListener(data);
        setJoined((prevJoined) => {
          if (!prevJoined) {
            socket.emit("get_chat_history", { username: user.firstName, room, token, receiver_id: receiverId });
          }
          return true;
        });
      });

      return () => {
        socket.emit("leave_room", { room: groupChatId });
        socket.off("receive_message", messageListener);
      };
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { receiver_id: receiverId, date: new Date().toISOString(), message, room, token });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 pt-16 rounded-2xl bg-transparent">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white rounded-2xl p-4 shadow-md text-center">
        <h2 className="text-lg font-semibold">Chat Room: {groupChatId || receiverId}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === user.firstName ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow-md ${
                msg.sender === user.firstName ? "bg-indigo-300 text-white self-end" : "bg-white text-black self-start"
              }`}
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p className="text-md">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 shadow-lg flex items-center gap-2 rounded-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-8 border flex-start rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="py-2 px-6 bg-indigo-600  text-white rounded-lg shadow-lg hover:from-blue-500 hover:to-green-400 transition-transform transform hover:scale-105"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  roomId: PropTypes.string,
  receiverId: PropTypes.string,
};

export default Chat;
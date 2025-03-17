import { useEffect, useState } from "react";
import socket from "./socket";
import { useAuth } from "./AuthContext";
import PropTypes from 'prop-types';

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 
  const { user } = useAuth();
  const groupChatId = props.roomId;
  const [room, setRoom] = useState(groupChatId);
  const receiverId = props.receiverId;
  let [joined, setJoined] = useState(false);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (user?.firstName) {
      if (!room) {
        const privateRoomId = [user.userId, receiverId].sort((a, b) => a - b).join("_");
        socket.emit("join_room", { username: user.firstName, room: privateRoomId, token });
        setRoom(privateRoomId);
      } else {
        socket.emit("join_room", { username: user.firstName, room, token });
      }

      
      // Request Notification Permission
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => console.log("New permission:", permission));
      }

      const messageListener = (data) => {
        console.log('received message:', data);
        setMessages((prevMessages) => [...prevMessages, data]);

        // Show a notification when a new message arrives
        if (Notification.permission === "granted" && data.sender !== user.firstName) {
          new Notification(`New message from ${data.sender}`, {
            body: data.message,
            icon: "/chat-icon.png", // Optional: Replace with your icon path
          });
        }
      };

      socket.on("receive_message", messageListener);
      socket.on("chat_history", (data) => {
        setMessages((prevMessages) => [...data.messages, ...prevMessages]);
      });

      socket.on("room_joined", (data) => {
        console.log('room joined:', data);
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
      socket.emit("send_message", { receiver_id: receiverId, date: new Date().toISOString(), message, room: room, token });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Room: {groupChatId || receiverId}</h2>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-green-300 to-blue-400 text-white rounded-md shadow-lg hover:from-blue-500 hover:to-green-400 transform transition duration-300 ease-in-out hover:scale-105"
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
  receiverId: PropTypes.string
};

export default Chat;
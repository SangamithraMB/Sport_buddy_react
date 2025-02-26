import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";


const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); 
  const { user } = useAuth();
//   const room = "SportBuddy";
  // eslint-disable-next-line no-unused-vars
  const [room, setRoom] = useState("SportBuddy");
//   let [notJoined, setNotJoined] = useState(true);
  const token = localStorage.getItem("jwtToken");
  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    withCredentials: true,
    query: { token },
    extraHeaders: {
        Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (user?.firstName) {
        console.log('emitting to join room', { username: user.firstName, room });
      socket.emit("join_room", { username: user.firstName, room, token });
    //   setNotJoined(false);

      const messageListener = (data) => {
        console.log('received message:', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.emit("leave_room", { room });
        socket.off("receive_message", messageListener);
      };
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", { receiver_id: '2', date: new Date().toISOString(), message, room, token });
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
      <h2>Chat Room: {room}</h2>

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
        onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
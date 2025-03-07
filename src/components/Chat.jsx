import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { fetchChats } from "../Services/chatService";
import { fetchUsers } from "../Services/userService";

const Chat = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const [room, setRoom] = useState("SportBuddy");
  const [userMap, setUserMap] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("jwtToken");
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
    withCredentials: true,
    query: { token },
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        console.log("Fetched Users:", users);
        const userMapping = {};
        users.forEach((u) => {
          userMapping[u.id] = u.first_name;
        });
        setUserMap(userMapping);
        setUsers(users.filter((u) => u.id !== user?.userId));
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, [user?.id]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const userChat = await fetchChats();
        const resolvedChat = userChat.map((chat) => ({
          ...chat,
          sender: userMap[chat.sender_id] || "Unknown",
        }));
        setChat(resolvedChat);
        setMessages(resolvedChat);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    if (Object.keys(userMap).length > 0) getChat();
  }, [userMap]);

  useEffect(() => {
    if (user?.firstName) {
      socket.emit("join_room", { username: user.firstName, room, token });

      const messageListener = (data) => {
        const resolvedMessage = {
          ...data,
          sender: userMap[data.sender_id] || "Unknown",
        };
        setMessages((prevMessages) => {
          const exists = prevMessages.some((msg) => msg.date === data.date);
          return exists ? prevMessages : [...prevMessages, resolvedMessage];
        });
      };

      socket.on("receive_message", messageListener);

      return () => {
        socket.emit("leave_room", { room });
        socket.off("receive_message", messageListener);
      };
    }
  }, [userMap]);

  const sendMessage = () => {
    if (!selectedUser) {
        console.error("No user selected for chat.");
        return;
      }

    if (message.trim() !== "") {
      socket.emit("send_message", {
        receiver_id: selectedUser.id,
        date: new Date().toISOString(),
        message,
        room,
        token,
      });
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 shadow-lg rounded-lg border border-gray-300 flex flex-col h-[80vh]">
      <h2 className="text-xl font-bold mb-2 text-gray-700 text-center">Chat Room: {room}</h2>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="users" className="text-gray-600 text-sm">Chat with:</label>
        <select
          id="users"
          value={selectedUser?.id || ""}
          onChange={(e) => {
            const userId = parseInt(e.target.value); 
            const userObj = users.find((user) => user.id === userId);
            setSelectedUser(userObj || null);
            localStorage.setItem("selectedUser", JSON.stringify(userObj));
            console.log("User selected:", userObj);
        }}
          className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 w-full"
        >
          <option value="">--Select a User--</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.first_name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded-md bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded-md w-fit max-w-xs ${msg.sender === user?.firstName ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800 self-start"}`}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />
        <button
          className="py-2 px-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md shadow-lg hover:from-blue-500 hover:to-green-400 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
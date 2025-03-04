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
    transports: ["websocket"],
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
            const userMapping = {};
            users.forEach((user) => {
                userMapping[user.id] = user.first_name;
                console.log(user.first_name);
            });
            setUserMap(userMapping);
            const filteredUsers = users.filter((user) => user.id !== user.id); // Exclude logged-in user
        setUsers(filteredUsers);
        if (filteredUsers.length > 0) {
          setSelectedUser(filteredUsers[0]);
        }
      } catch (err) { 
          console.error("Error fetching users:", err);
      }
    }
    getUsers();
}, []);

  useEffect(() => {
    const getChat = async () => {
      try {
          const userChat = await fetchChats();
          const resolvedChat = userChat.map((chat) => {
              return {
                  ...chat,
                  sender: userMap[chat.sender_id] || "Unknown",
              };
          });
          console.log("userChat", userChat);
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
      console.log("Emitting to join room", { username: user.firstName, room });
      socket.emit("join_room", { username: user.firstName, room, token });

      const messageListener = (data) => {
        console.log("Received message:", data);
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
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold mb-2 text-gray-700">Chat Room: {room}</h2>
      {/* User selection dropdown */}
      <div className="mb-2">
        <label className="text-gray-600 text-sm">Chat with:</label>
        <select
          value={selectedUser?.id || ""}
          onChange={(e) => {
            const userId = e.target.value;
            const userObj = users.find((u) => u.id.toString() === userId);
            setSelectedUser(userObj);
          }}
          className="ml-2 p-1 border rounded-md"
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.first_name} {/* Display name instead of ID */}
            </option>
          ))}
        </select>
      </div>

         {/* Chat messages */}
      <div className="h-64 overflow-y-auto p-2 border border-gray-300 rounded-md mb-2 bg-gray-100">
        {messages.map((msg, index) => (
          <p key={index} className="mb-1 text-sm text-gray-800">
            <strong className="text-blue-600">{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>


      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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

import { io } from "socket.io-client";

const token = localStorage.getItem("jwtToken");
  const socket = io("http://0.0.0.0:5000", {
    transports: ["websocket"],
    withCredentials: true,
    query: { token },
    extraHeaders: {
        Authorization: `Bearer ${token}`,
    },
  });

  export default socket; 
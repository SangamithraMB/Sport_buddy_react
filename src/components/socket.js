import { io } from "socket.io-client";

const token = localStorage.getItem("jwtToken");
const web_socket_url = import.meta.env.VITE_WEB_SOCKET_URL;
console.log('ws', web_socket_url)
  const socket = io(web_socket_url, {
    transports: ["websocket"],
    withCredentials: true,
    query: { token },
    extraHeaders: {
        Authorization: `Bearer ${token}`,
    },
  });

  export default socket; 
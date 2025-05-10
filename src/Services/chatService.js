import api from "./apiService";

export const fetchChats = async () => {
 const response = await api.get('/chat');
 return response.data;
};

export const fetchChatsById = async (chatId) => {
 const response = await api.get(`/chat/${chatId}`);
 return response.data;
};

export const createChat = async (chatData) => {
 const response = await api.post('/chat', chatData);
 return response.data;
};

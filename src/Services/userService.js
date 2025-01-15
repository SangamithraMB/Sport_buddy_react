 import api from "./apiService";

 export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUsersById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
}

export const updateUser = async (userId, updatedData) => {
  const response = await api.put(`/users/${userId}`, updatedData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
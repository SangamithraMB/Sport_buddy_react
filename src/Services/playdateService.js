import api from "./apiService";

export const fetchPlaydates = async () => {
    const response = await api.get('/playdates');
    return response.data
}

export const fetchPlaydatesById = async (playdateId) => {
    const response = await api.get(`/playdate/${playdateId}`);
    return response.data
}

export const createPlaydate = async (playdateData) => {
    const response = await api.post('/playdates', playdateData);
    return response.data
}

export const updatePlaydate = async (playdateId, updatedPlaydate) => {
    const response = await api.put(`/playdate/${playdateId}`, updatedPlaydate);
    return response.data
}

export const deletePlaydate = async (playdateId) => {
    const response = await api.delete(`/playdate/${playdateId}`);
    return response.data
}
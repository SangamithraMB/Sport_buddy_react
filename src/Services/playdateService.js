import api from "./apiService";

export const fetchPlaydates = async () => {
    const response = await api.get('/playdates');
    return response.data
}

export const fetchPlaydatesById = async (playdateId) => {
    const response = await api.get(`/playdates/${playdateId}`);
    return response.data
}

export const createPlaydate = async (playdateData) => {
    const response = await api.post('/playdates', playdateData);
    return response.data
}

export const updatePlaydate = async (playdateId, updatedPlaydate) => {
    const response = await api.put(`/playdates/${playdateId}`, updatedPlaydate);
    return response.data
}

export const deletePlaydate = async (playdateId) => {
    const response = await api.delete(`/playdates/${playdateId}`);
    return response.data
}
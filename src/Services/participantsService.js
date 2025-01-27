import api from "./apiService";

export const fetchParticipants = async (playdateId) => {
    const response = await api.get(`/playdates/${playdateId}/participants`);
    return response.data
}

export const createParticipants = async (playdateId, participantsData) => {
    const response = await api.post(`/playdates/${playdateId}/participants`, JSON.stringify(participantsData));
    return response.data
}

export const deleteParticipants = async (playdateId, userId) => {
    const response = await api.delete(`/playdates/${playdateId}/participants/${userId}`);
    return response.data
}
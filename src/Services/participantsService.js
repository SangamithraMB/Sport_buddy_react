import api from "./apiService";

export const fetchParticipants = async () => {
    const response = await api.get('/participants');
    return response.data
}

export const fetchParticipantsById = async (playdateId) => {
    const response = await api.get(`/participants/${playdateId}`);
    return response.data
}

export const createParticipants = async (participantsData) => {
    const response = await api.post('/participants', participantsData);
    return response.data
}

export const updateParticipants = async (participantsId, updatedParticipants) => {
    const response = await api.put(`/participants/${participantsId}`, updatedParticipants);
    return response.data
}

export const deleteParticipants = async (participantsId) => {
    const response = await api.delete(`/participants/${participantsId}`);
    return response.data
}
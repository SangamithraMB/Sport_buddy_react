import api from "./apiService";

export const createSports = async (sportData) => {
    const response = await api.post('/sports', sportData)
    return response.data
}

export const fetchSports = async () => {
    const response = await api.get('/sports')
    return response.data
}

export const updateSports = async (updatedSports, sportId) => {
    const response = await api.put(`/sports/${sportId}`, updatedSports)
    return response.data
}

export const deleteSports = async (sportId) => {
    const response = await api.delete(`/sports/${sportId}`)
    return response.data
}
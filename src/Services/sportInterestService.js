import api from "./apiService";

export const createSportInterest = async (sportInterestData) => {
    const response = await api.post('/sport_interest', sportInterestData)
    return response.data
}

export const fetchSportInterest = async () => {
    const response = await api.get('/sport_interest')
    return response.data
}


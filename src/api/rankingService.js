import api from "./axios";

export const getRanking = async () => {

    const response = await api.get("/ranking");

    return response.data;

};
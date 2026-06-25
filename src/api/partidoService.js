import api from "./axios";

export const getPartidos = async () => {

    const response = await api.get("/partidos");

    return response.data;

};
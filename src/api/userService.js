//traemos los datos de la api para el perfil
import api from "./axios";

export const getProfile = async () => {

    const response = await api.get("/users/me");

    return response.data;

};
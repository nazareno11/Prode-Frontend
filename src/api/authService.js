//funciones realacionadas con autenticacion
import api from "./axios";

const login = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    return response.data;

};

const register = async (user) => {

    const response = await api.post("/auth/register", user);

    return response.data;

};

export { login, register }; 
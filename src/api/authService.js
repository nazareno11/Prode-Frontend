//funciones realacionadas con autenticacion
import api from "./axios";

const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export { login };

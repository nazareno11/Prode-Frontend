import axios from "axios";

// intanciamos la api 
const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

export default api;
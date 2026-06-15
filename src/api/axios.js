import axios from "axios";
//intanciamos la api
const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;

    },

    (error) => Promise.reject(error)

);

api.interceptors.response.use(

    (response) => response, // si responde correctamente

    (error) => {

        if (error.response?.status === 401) { // si responde 401 volvemos al login 

            localStorage.removeItem("token");
            localStorage.removeItem("username");

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

export default api;
/*
guardamos el usuario que viene de la api con el jwt
y con este contexto cualquier componente va a acceder a los datos
tenemos que guardar user, token, login, logout
*/
import * as authService from "../api/authService"

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(); // caja que almacena los datos 

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {

        setToken(token);

        setUser({
            username
        });

    }

    }, []);

    const login = async (email, password) => {

        const response = await authService.login({ email, password });

        setUser({
            username: response.username
        });

        setToken(response.token);

        localStorage.setItem("token", response.token);
        localStorage.setItem("username", response.username);

        return response;

    };

    const register = async (userData) => {

        return await authService.register(userData);

    };

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("token");// borramos el almacenamiento del localstorage
        localStorage.removeItem("username");

    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider

            value={{

                login,

                logout,

                register,

                isAuthenticated,

                token

            }}

        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
/*
guardamos el usuario que viene de la api con el jwt
y con este contexto cualquier componente va a acceder a los datos
tenemos que guardar user, token, login, logout
*/
import * as authService from "../api/authService" // auth

import * as userService from "../api/userService"; // perfil 

import { createContext, useEffect, useState } from "react";

const AuthContext = createContext(); // caja que almacena los datos 

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
   
    const updateUser = (newData) => {
    setUser(prev => ({
        ...prev,
        ...newData
    }));
    };
    

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) return;

            try {

                setToken(token);

                const profile = await userService.getProfile();

                setUser(profile);

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");
                localStorage.removeItem("username");

            }
        };

        loadUser();

    }, []);

    const login = async (email, password) => {

        const response = await authService.login({ email, password });

        setToken(response.token);

        localStorage.setItem("token", response.token);

        const profile = await userService.getProfile();

        setUser(profile);

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

                user,
                updateUser,
                token,

                login,
                logout,
                register,

                isAuthenticated

            }}

        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
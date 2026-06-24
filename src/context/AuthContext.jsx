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
    const [loading, setLoading] = useState(true);
   
    const updateUser = (newData) => {
    setUser(prev => ({
        ...prev,
        ...newData
    }));
    };
    

    useEffect(() => {

        const loadUser = async () => {

            const storedToken = localStorage.getItem("token");

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {

                setToken(storedToken);

                const profile = await userService.getProfile();

                setUser(profile);

            } catch (error) {

                console.error(error);

                localStorage.removeItem("token");

            } finally {

                setLoading(false);

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

        localStorage.removeItem("token"); // borramos el almacenamiento del localstorage

    };

    // permite refrescar el perfil sin tener que relogear
    // util despues de editar datos del usuario (puntos, ranking, etc)
    const refreshProfile = async () => {

        const profile = await userService.getProfile();

        setUser(profile);

        return profile;
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider

            value={{

                user,
                updateUser,
                token,
                loading,

                login,
                logout,
                register,
                refreshProfile,

                isAuthenticated

            }}

        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
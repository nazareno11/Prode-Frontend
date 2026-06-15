/*
guardamos el usuario que viene de la api con el jwt
y con este contexto cualquier componente va a acceder a los datos
tenemos que guardar user, token, login, logout
*/


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

    const login = (response) => {

        setUser({
            username: response.username
        });

        setToken(response.token);

        localStorage.setItem("token", response.token);      // guardamos los datos en localstorage
        localStorage.setItem("username", response.username);

    };

    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("token");// borramos el almacenamiento del localstorage
        localStorage.removeItem("username");

    };

    return (   
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
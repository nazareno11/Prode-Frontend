/*
guardamos el usuario que viene de la api con el jwt
y con este contexto cualquier componente va a acceder a los datos
tenemos que guardar user, token, login, logout
*/


import { createContext, useState } from "react";

const AuthContext = createContext(); // caja que almacena los datos 

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
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
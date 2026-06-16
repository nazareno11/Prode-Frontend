//evitamos que el usuraio intente logearse dos veces

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {

    const { token } = useAuth();

    if (token) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
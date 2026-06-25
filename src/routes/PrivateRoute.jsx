import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//si alguien no registrado quiere ingresar a algun endpoint lo manda al login
const PrivateRoute = ({ children }) => {

    const { token, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;

import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Perfil from "./pages/perfil/Perfil";

import MainLayout from "./layouts/MainLayout";
import Partidos from "./pages/partido/Partidos";
function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    }
                />  

                <Route
                    path="/partidos"
                    element={<Partidos />}
                />              


            </Route>

        </Routes>
    );
}

export default App;
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Perfil from "./pages/perfil/Perfil";
import Ranking from "./pages/ranking/Ranking";

import MainLayout from "./layouts/MainLayout";
import Partidos from "./pages/partido/Partidos";

import Grupos from "./pages/grupos/Grupos";
import GrupoDetalle from "./pages/grupos/GrupoDetalle";
import MisPronosticos from "./pages/pronosticos/Mispronosticos";
function App() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />

                <Route path="/partidos" element={<Partidos />} />

                <Route
                    path="/ranking"
                    element={
                        <PrivateRoute>
                            <Ranking />
                        </PrivateRoute>
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
                    path="/grupos"
                    element={
                        <PrivateRoute>
                            <Grupos />
                        </PrivateRoute>
                    }
                />
 
                <Route
                    path="/grupos/:id"
                    element={
                        <PrivateRoute>
                            <GrupoDetalle />
                        </PrivateRoute>
                    }
                />                

                <Route
                    path="/mis-pronosticos"
                    element={
                        <PrivateRoute>
                            <MisPronosticos />
                        </PrivateRoute>
                    }
                />

            </Route>

        </Routes>
    );
}

export default App;
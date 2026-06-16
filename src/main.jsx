import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

/*Estilos css*/
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/animation.css";
import "./styles/utilities.css";
/*Estilos css*/




createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
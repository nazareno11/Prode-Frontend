import Navbar from "../components/navbar/Navbar";
import Background from "../components/background/Background";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <Background />

            <Navbar />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
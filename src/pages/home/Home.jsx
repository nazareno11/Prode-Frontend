import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Home</h1>

            <Link to="/login">
                Ir al Login
            </Link>

            <br />

            <Link to="/register">
                Registrarse
            </Link>
        </>
    );
};

export default Home;
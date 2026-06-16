import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { login as loginService } from "../../api/authService";

import { useAuth } from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();

    const { login } = useAuth();

    const { register, handleSubmit } = useForm();

   const enviar = async (data) => {

    try {

        const response = await loginService(data);

        login(response);

        navigate("/");

    } catch (error) {

        console.log(error);

    }

    };

    return (
        <form onSubmit={handleSubmit(enviar)}>

            <input
                type="email"
                placeholder="Email"
                {...register("email")}
            />

            <input
                type="password"
                placeholder="Contraseña"
                {...register("password")}
            />

            <button type="submit">
                Iniciar sesión
            </button>

        </form>
    );

};

export default Login;
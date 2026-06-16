import { useForm } from "react-hook-form";
import { register as registerService } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [backendError, setBackendError] = useState("");

    const enviar = async (data) => {

        if (data.password !== data.confirmPassword) {

            alert("Las contraseñas no coinciden");

            return;

        }

        try {

            await registerService({
                username: data.username,
                email: data.email,
                password: data.password
            });

            alert("Usuario registrado correctamente");

            navigate("/login");

        } catch (error) {

            setBackendError(error.response?.data?.detail || "Ocurrió un error");

        }

    };

    return (

        <form onSubmit={handleSubmit(enviar)}>

            <input
                type="text"
                placeholder="Usuario"
                {...register("username", {
                    required: "El nombre de usuario es obligatorio"
                })}
            />

            {errors.username && (
            <p>{errors.username.message}</p>
            )}

            <input
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Ingrese un email válido"
                    }
                })}
            />
            {errors.email && (
            <p>{errors.email.message}</p>
            )}

            <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "Debe tener al menos 6 caracteres"
                    }
                })}
            />
            {errors.password && (
                <p>{errors.password.message}</p>
            )}                

            <input
                type="password"
                placeholder="Confirmar contraseña"
                {...register("confirmPassword", {
                    required: "Confirme la contraseña"
                })}
            />
            {errors.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
            )}


            
            <button type="submit">
                Registrase
            </button>
            
            {
                backendError &&

                <p>{backendError}</p>
            }            

        </form>

    );

};

export default Register;
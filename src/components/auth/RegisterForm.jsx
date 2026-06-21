import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            });

            console.log("Usuario registrado");
            navigate("/login");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <section className="login-container">

            <div className="login-card">

                <h1>Crear cuenta</h1>

                <p>
                    Registrate para comenzar a jugar el Prode Mundial 2026.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group">

                        <label>Nombre</label>

                        <input

                            type="text"

                            placeholder="Nombre de usuario"

                            {...register("username", {
                                required: "El nombre de usuario es obligatorio"
                            })}

                        />

                        {errors.username && (
                            <small className="error">
                                {errors.username.message}
                            </small>
                        )}

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            {...register("email", {
                                required: "El email es obligatorio"
                            })}
                        />

                        {errors.email && (
                            <small className="error">
                                {errors.email.message}
                            </small>
                        )}

                    </div>

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="********"
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Debe tener al menos 6 caracteres"
                                }
                            })}
                        />

                        {errors.password && (
                            <small className="error">
                                {errors.password.message}
                            </small>
                        )}

                    </div>

                    <div className="input-group">

                        <label>Confirmar contraseña</label>

                        <input
                            type="password"
                            placeholder="********"
                            {...register("confirmPassword", {
                                required: "Confirmá la contraseña",
                                validate: value =>
                                    value === watch("password") ||
                                    "Las contraseñas no coinciden"
                            })}
                        />

                        {errors.confirmPassword && (
                            <small className="error">
                                {errors.confirmPassword.message}
                            </small>
                        )}

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Crear cuenta
                    </button>

                </form>

                <div className="login-register">

                    <span>¿Ya tenés cuenta?</span>

                    <Link to="/login">
                        Iniciar sesión
                    </Link>

                </div>

            </div>

        </section>

    );

};

export default RegisterForm;
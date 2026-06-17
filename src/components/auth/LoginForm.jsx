import "./LoginForm.css";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    //formulario    
    const { register,handleSubmit,formState: { errors } } = useForm();

    const { login } = useAuth();

    const navigate = useNavigate();

    // funcion submit
    const onSubmit = async (data) => {

        try {

            await login(data.email, data.password);

            navigate("/perfil");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <section className="login-container">

            <div className="login-card">

                <h1>Bienvenido</h1>

                <p>
                    Iniciá sesión para comenzar a jugar el Prode Mundial 2026.
                </p>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"

                            {...register("email", {
                                required: "El email es obligatorio"
                            })}
                        />

                        {
                            errors.email &&
                            <small className="error">    {/*Error*/}
                                {errors.email.message}
                            </small>
                        }                        

                    </div>

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="********"

                            {...register("password", {
                                required: "La contraseña es obligatoria"
                            })}
                        />
                        {
                            errors.password &&
                            <small className="error">       {/*Error*/}
                                {errors.password.message}
                            </small>
                        }

                    </div>

                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Empezar a jugar
                    </button>

                </form>

                <span className="login-register">

                    ¿No tenés cuenta?

                </span>

            </div>

        </section>

    );

};

export default LoginForm;

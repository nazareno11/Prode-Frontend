import "../login/Login.css";

const LoginForm = () => {

    return (

        <section className="login-container">
            
            <div className="login-card">
                
                <h1>Bienvenido</h1>

                <p>
                    Iniciá sesión para comenzar a jugar el Prode Mundial 2026.
                </p>

                <form>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                        />

                    </div>

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="********"
                        />

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
import "./Features.css";

const Features = () => {

    return (

        <section className="features">

            <div className="container">

                <h2>¿Cómo funciona?</h2>

                <p className="features-subtitle">

                    Todo listo para vivir el Mundial de una forma diferente.

                </p>

                <div className="features-grid">

                    <article className="feature-card">

                        <span>⚽</span>

                        <h3>Pronosticá</h3>

                        <p>

                            Elegí el resultado de cada partido antes del inicio.

                        </p>

                    </article>

                    <article className="feature-card">

                        <span>🏆</span>

                        <h3>Sumá puntos</h3>

                        <p>

                            Acertá resultados y obtené la mayor cantidad de puntos posible.

                        </p>

                    </article>

                    <article className="feature-card">

                        <span>📈</span>

                        <h3>Escalá el ranking</h3>

                        <p>

                            Competí con tus amigos y convertite en el campeón del Prode.

                        </p>

                    </article>

                </div>

            </div>

        </section>

    );

};

export default Features;
import "./hero.css";

import logo from "../../assets/images/logo/a898cd470a8c75548b163a338339538c.png";

const Hero = () => {

    return (

        <section className="hero">

            <div className="container hero-container">

                <div className="hero-content">

                    <img
                        src={logo}
                        alt="Logo Mundial Prode"
                        className="hero-logo"
                    />

                    <h1>

                        Fifa World Cup 2026

                    </h1>

                    <p>

                        Viví cada partido como nunca antes.
                        Pronosticá resultados, competí con tus amigos
                        y convertite en el campeón del Prode.

                    </p>

                    <button className="hero-button">

                        Comenzar ahora

                    </button>

                </div>

            </div>

        </section>

    );

};

export default Hero;
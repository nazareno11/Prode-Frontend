import { useEffect, useState } from "react";
import { getRanking } from "../../api/rankingService";

import "./Ranking.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const cargarRanking = async () => {
      try {
        const data = await getRanking();

        setRanking(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarRanking();
  }, []);

  return (
    <section className="ranking-page">
      <h1>🏆 Ranking Mundial Prode 2026</h1>

      <div className="ranking-table">
        <div className="ranking-header">
          <span>Pos.</span>
          <span>Usuario</span>
          <span>Puntos</span>
          <span>Plenos</span>
        </div>

        {ranking.map((jugador) => (
          <div
            key={jugador.usuarioId}
            className={`ranking-row ${
              jugador.posicion <= 3 ? "top-three" : ""
            }`}
          >
            <span>
              {jugador.posicion === 1
                ? "🥇"
                : jugador.posicion === 2
                  ? "🥈"
                  : jugador.posicion === 3
                    ? "🥉"
                    : jugador.posicion}
            </span>

            <span>{jugador.username}</span>

            <span>{jugador.puntosTotales}</span>

            <span>{jugador.plenosAcertados}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ranking;

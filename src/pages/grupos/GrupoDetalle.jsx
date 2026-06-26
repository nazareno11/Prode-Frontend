import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRankingGrupo } from "../../api/grupoService";
import "./GrupoDetalle.css";

const GrupoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarRanking();
  }, [id]);

  const cargarRanking = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRankingGrupo(id);
      setRanking(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar el ranking de este grupo.");
    } finally {
      setLoading(false);
    }
  };

  const medalla = (posicion) => {
    if (posicion === 1) return "🥇";
    if (posicion === 2) return "🥈";
    if (posicion === 3) return "🥉";
    return posicion;
  };

  if (loading) {
    return <h2 className="grupo-detalle-loading">Cargando ranking...</h2>;
  }

  return (
    <div className="grupo-detalle-page">
      <button className="volver-btn" onClick={() => navigate("/grupos")}>
        ← Volver a mis grupos
      </button>

      <h1>Ranking</h1>

      {error && (
        <div className="grupo-detalle-error">
          <p>{error}</p>
          <button onClick={cargarRanking}>Reintentar</button>
        </div>
      )}

      {!error && (
        <div className="ranking-tabla">
          <div className="ranking-header">
            <span className="col-pos">#</span>
            <span className="col-user">Usuario</span>
            <span className="col-puntos">Puntos</span>
            <span className="col-plenos">Plenos</span>
          </div>

          {ranking.map((item) => (
            <div key={item.usuarioId} className="ranking-row">
              <span className="col-pos">{medalla(item.posicion)}</span>
              <span className="col-user">{item.username}</span>
              <span className="col-puntos">{item.puntosTotales}</span>
              <span className="col-plenos">{item.plenosAcertados}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrupoDetalle;
import { useEffect, useState } from "react";
import { getPartidos } from "../../api/partidoService";
import { getPronosticosPropios, guardarPronostico } from "../../api/pronosticoService";
import MatchCard from "../../components/matches/MatchCard";
import "./Mispronosticos.css";

// Tabs disponibles. El value coincide con el enum EstadoPartido del back
// (o null para "Todos", que no manda el filtro ?estado=).
const TABS = [
  { label: "Por jugarse", value: "POR_JUGARSE" },
  { label: "Finalizados", value: "FINALIZADO" },
  { label: "Todos", value: null }
];

const MisPronosticos = () => {
  const [tabActivo, setTabActivo] = useState(TABS[0].value);

  const [partidosPorId, setPartidosPorId] = useState({});
  const [pronosticos, setPronosticos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos(tabActivo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActivo]);

  const cargarDatos = async (estado) => {
    try {
      setLoading(true);
      setError(null);

      // Pedimos en paralelo: todos los partidos (para tener equipos/escudos/fecha)
      // y los pronósticos propios ya filtrados por el back según el tab activo.
      const [dataPartidos, dataPronosticos] = await Promise.all([
        getPartidos(),
        getPronosticosPropios(estado)
      ]);

      setPartidosPorId(mapearPartidosPorId(dataPartidos));
      setPronosticos(dataPronosticos);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus pronósticos. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const mapearPartidosPorId = (listaPartidos) => {
    const mapa = {};
    listaPartidos.forEach((p) => {
      mapa[p.id] = p;
    });
    return mapa;
  };

  // Mapa partidoId -> pronostico, para pasarle a cada MatchCard el suyo
  const pronosticosPorPartido = {};
  pronosticos.forEach((p) => {
    pronosticosPorPartido[p.partidoId] = p;
  });

  // Se llama desde MatchCard cuando el usuario edita un pronóstico existente
  const handleGuardarPronostico = async (partidoId, golesLocal, golesVisitante) => {
    try {
      const pronosticoGuardado = await guardarPronostico({
        partidoId,
        golesLocal,
        golesVisitante
      });

      setPronosticos((prev) => {
        const sinEseProns = prev.filter((p) => p.partidoId !== partidoId);
        return [...sinEseProns, pronosticoGuardado];
      });

      return { ok: true };
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No se pudo guardar el pronóstico.";

      return { ok: false, mensaje };
    }
  };

  // Solo mostramos partidos que tengan un pronóstico cargado (es la sección
  // "Mis Pronósticos", no el listado completo de partidos).
  const partidosConPronostico = pronosticos
    .map((p) => partidosPorId[p.partidoId])
    .filter(Boolean)
    // Orden por fecha del partido, más próximo primero
    .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora));

  return (
    <div className="mis-pronosticos-page">
      <h1>Mis Pronósticos</h1>

      <div className="pronosticos-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.label}
            className={`tab-btn ${tabActivo === tab.value ? "tab-btn--activo" : ""}`}
            onClick={() => setTabActivo(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <h2 className="pronosticos-loading">Cargando...</h2>}

      {!loading && error && (
        <div className="pronosticos-error">
          <p>{error}</p>
          <button onClick={() => cargarDatos(tabActivo)}>Reintentar</button>
        </div>
      )}

      {!loading && !error && partidosConPronostico.length === 0 && (
        <p className="pronosticos-vacio">
          Todavía no tenés pronósticos en esta categoría.
        </p>
      )}

      {!loading && !error && (
        <div className="pronosticos-lista">
          {partidosConPronostico.map((partido) => (
            <MatchCard
              key={partido.id}
              partido={partido}
              pronostico={pronosticosPorPartido[partido.id] ?? null}
              onGuardarPronostico={handleGuardarPronostico}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPronosticos;
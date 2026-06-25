import { useEffect, useState } from "react";
import { getPartidos } from "../../api/partidoService";
import { getPronosticosPropios, guardarPronostico } from "../../api/pronosticoService";
import MatchCard from "../../components/matches/MatchCard";
import "./Partidos.css";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  // mapa partidoId -> pronostico, para acceso O(1) desde cada MatchCard
  const [pronosticos, setPronosticos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Pedimos ambas cosas en paralelo, no hace falta esperar una para la otra
      const [dataPartidos, dataPronosticos] = await Promise.all([
        getPartidos(),
        getPronosticosPropios()
      ]);

      setPartidos(dataPartidos);
      setPronosticos(mapearPronosticosPorPartido(dataPronosticos));
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los partidos. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const mapearPronosticosPorPartido = (listaPronosticos) => {
    const mapa = {};

    listaPronosticos.forEach((p) => {
      mapa[p.partidoId] = p;
    });

    return mapa;
  };

  // Se llama desde MatchCard cuando el usuario guarda/edita su pronóstico.
  // Devuelve { ok, mensaje } para que el MatchCard sepa cómo reaccionar.
  const handleGuardarPronostico = async (partidoId, golesLocal, golesVisitante) => {
    try {
      const pronosticoGuardado = await guardarPronostico({
        partidoId,
        golesLocal,
        golesVisitante
      });

      setPronosticos((prev) => ({
        ...prev,
        [partidoId]: pronosticoGuardado
      }));

      return { ok: true };
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No se pudo guardar el pronóstico.";

      return { ok: false, mensaje };
    }
  };

  if (loading) {
    return <h2>Cargando partidos...</h2>;
  }

  if (error) {
    return (
      <div className="partidos-error">
        <p>{error}</p>
        <button onClick={cargarDatos}>Reintentar</button>
      </div>
    );
  }

  const partidosPorGrupo = agruparPorGrupo(partidos);

  return (
    <div className="partidos-page">
      <h1>Partidos</h1>

      {Object.entries(partidosPorGrupo).map(([grupo, partidosDelGrupo]) => (
        <section key={grupo} className="grupo-section">
          <h2 className="grupo-title">{formatearNombreGrupo(grupo)}</h2>

          {partidosDelGrupo.map((partido) => (
            <MatchCard
              key={partido.id}
              partido={partido}
              pronostico={pronosticos[partido.id] ?? null}
              onGuardarPronostico={handleGuardarPronostico}
            />
          ))}
        </section>
      ))}
    </div>
  );
};

// Agrupa los partidos por su campo "grupo" (GROUP_A, GROUP_B, ...).
// Si algún partido no tiene grupo (ej: fase eliminatoria), cae en "Otros".
const agruparPorGrupo = (listaPartidos) => {
  const grupos = {};

  listaPartidos.forEach((partido) => {
    const clave = partido.grupo || "Otros";

    if (!grupos[clave]) {
      grupos[clave] = [];
    }

    grupos[clave].push(partido);
  });

  return grupos;
};

// "GROUP_A" -> "Grupo A"
const formatearNombreGrupo = (grupo) => {
  if (grupo === "Otros") return grupo;

  const letra = grupo.replace("GROUP_", "");
  return `Grupo ${letra}`;
};

export default Partidos;
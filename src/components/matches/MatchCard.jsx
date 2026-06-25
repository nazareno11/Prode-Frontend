import { useState } from "react";
import "./MatchCard.css";

// Minutos antes del partido en que el back bloquea el pronóstico.
// Coincide con la regla del PronosticoServiceImpl (minusMinutes(30)).
const MINUTOS_LIMITE = 30;

const MatchCard = ({ partido, pronostico, onGuardarPronostico }) => {
  const fecha = new Date(partido.fechaHora);

  const [editando, setEditando] = useState(false);
  const [golesLocal, setGolesLocal] = useState(pronostico?.golesLocal ?? "");
  const [golesVisitante, setGolesVisitante] = useState(pronostico?.golesVisitante ?? "");
  const [guardando, setGuardando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const esPorJugarse = partido.estado === "POR_JUGARSE";

  // Replicamos la regla del back: a partir de los 30 min previos al partido
  // ya no se puede crear ni modificar el pronóstico.
  const margenExpirado =
    new Date() > new Date(fecha.getTime() - MINUTOS_LIMITE * 60 * 1000);

  const puedeEditar = esPorJugarse && !margenExpirado;
  const tienePronostico = !!pronostico;

  const handleEditar = () => {
    setErrorMsg(null);
    setGolesLocal(pronostico?.golesLocal ?? "");
    setGolesVisitante(pronostico?.golesVisitante ?? "");
    setEditando(true);
  };

  const handleCancelar = () => {
    setErrorMsg(null);
    setEditando(false);
  };

  const handleGuardar = async () => {
    if (golesLocal === "" || golesVisitante === "") {
      setErrorMsg("Completá ambos resultados.");
      return;
    }

    setGuardando(true);
    setErrorMsg(null);

    const resultado = await onGuardarPronostico(
      partido.id,
      Number(golesLocal),
      Number(golesVisitante)
    );

    setGuardando(false);

    if (resultado.ok) {
      setEditando(false);
    } else {
      setErrorMsg(resultado.mensaje);
    }
  };

  const renderCentro = () => {
    // Partido ya jugado (o en curso) -> mostramos el resultado real
    if (!esPorJugarse) {
      return (
        <div className="match-result">
          {partido.resultadoLocal}
          <span>-</span>
          {partido.resultadoVisitante}
        </div>
      );
    }

    // Por jugarse, pero ya no se puede pronosticar (margen vencido)
    if (!puedeEditar) {
      if (tienePronostico) {
        return (
          <div className="match-result match-result--bloqueado">
            {pronostico.golesLocal}
            <span>-</span>
            {pronostico.golesVisitante}
          </div>
        );
      }

      return (
        <div className="match-locked-msg">No pronosticaste a tiempo</div>
      );
    }

    // Por jugarse y dentro del margen, pero el usuario no está editando:
    // mostramos su pronóstico guardado en modo lectura con opción de editar
    if (tienePronostico && !editando) {
      return (
        <div className="prediction-saved">
          <div className="match-result">
            {pronostico.golesLocal}
            <span>-</span>
            {pronostico.golesVisitante}
          </div>
          <button className="edit-prediction-btn" onClick={handleEditar}>
             Editar
          </button>
        </div>
      );
    }

    // Por jugarse, dentro del margen, y sin pronóstico (o editando uno existente)
    return (
      <div className="prediction-form">
        <div className="prediction-inputs">
          <input
            type="number"
            min="0"
            value={golesLocal}
            onChange={(e) => setGolesLocal(e.target.value)}
            disabled={guardando}
          />
          <span>-</span>
          <input
            type="number"
            min="0"
            value={golesVisitante}
            onChange={(e) => setGolesVisitante(e.target.value)}
            disabled={guardando}
          />
        </div>

        <div className="prediction-actions">
          <button
            className="save-prediction-btn"
            onClick={handleGuardar}
            disabled={guardando}
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>

          {tienePronostico && (
            <button
              className="cancel-prediction-btn"
              onClick={handleCancelar}
              disabled={guardando}
            >
              Cancelar
            </button>
          )}
        </div>

        {errorMsg && <p className="prediction-error">{errorMsg}</p>}
      </div>
    );
  };

  return (
    <article className="match-card">
      <div className="match-teams">
        <div className="team">
          <img src={partido.escudoLocal} alt={partido.equipoLocal} />
          <span>{partido.equipoLocal}</span>
        </div>

        <div className="match-center">{renderCentro()}</div>

        <div className="team">
          <img src={partido.escudoVisitante} alt={partido.equipoVisitante} />
          <span>{partido.equipoVisitante}</span>
        </div>
      </div>

      <div className="match-footer">
        <span>{partido.fecha}</span>
        <span>{fecha.toLocaleString()}</span>
      </div>
    </article>
  );
};

export default MatchCard;
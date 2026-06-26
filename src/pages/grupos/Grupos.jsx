import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearGrupo, getMisGrupos, unirseAGrupo } from "../../api/grupoService";
import "./Grupos.css";

const Grupos = () => {
  const navigate = useNavigate();

  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalActivo, setModalActivo] = useState(null); // "crear" | "unirse" | null
  const [inputValor, setInputValor] = useState("");
  const [modalError, setModalError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const [codigoCopiado, setCodigoCopiado] = useState(null);

  useEffect(() => {
    cargarGrupos();
  }, []);

  const cargarGrupos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMisGrupos();
      setGrupos(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus grupos. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (tipo) => {
    setModalActivo(tipo);
    setInputValor("");
    setModalError(null);
  };

  const cerrarModal = () => {
    setModalActivo(null);
    setInputValor("");
    setModalError(null);
  };

  const handleConfirmarModal = async () => {
    if (!inputValor.trim()) {
      setModalError(
        modalActivo === "crear"
          ? "Ingresá un nombre para el grupo."
          : "Ingresá un código de invitación."
      );
      return;
    }

    setEnviando(true);
    setModalError(null);

    try {
      const nuevoGrupo =
        modalActivo === "crear"
          ? await crearGrupo(inputValor.trim())
          : await unirseAGrupo(inputValor.trim().toUpperCase());

      setGrupos((prev) => {
        // Si ya estaba en la lista (caso unirse a uno que ya tenías, poco probable
        // pero por seguridad), lo reemplazamos en lugar de duplicarlo.
        const sinElGrupo = prev.filter((g) => g.id !== nuevoGrupo.id);
        return [...sinElGrupo, nuevoGrupo];
      });

      cerrarModal();
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Ocurrió un error. Intentá nuevamente.";

      setModalError(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  const handleCopiarCodigo = async (codigo) => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCodigoCopiado(codigo);
      setTimeout(() => setCodigoCopiado(null), 1500);
    } catch (err) {
      console.error("No se pudo copiar el código", err);
    }
  };

  if (loading) {
    return <h2 className="grupos-loading">Cargando grupos...</h2>;
  }

  return (
    <div className="grupos-page">
      <h1>Mis Grupos</h1>

      <div className="grupos-acciones">
        <button className="btn-primario" onClick={() => abrirModal("crear")}>
          + Crear grupo
        </button>
        <button className="btn-secundario" onClick={() => abrirModal("unirse")}>
          Unirme a un grupo
        </button>
      </div>

      {error && (
        <div className="grupos-error">
          <p>{error}</p>
          <button onClick={cargarGrupos}>Reintentar</button>
        </div>
      )}

      {!error && grupos.length === 0 && (
        <p className="grupos-vacio">
          Todavía no formás parte de ningún grupo. Creá uno o unite con un código de invitación.
        </p>
      )}

      <div className="grupos-lista">
        {grupos.map((grupo) => (
          <div
            key={grupo.id}
            className="grupo-card"
            onClick={() => navigate(`/grupos/${grupo.id}`)}
          >
            <div className="grupo-card-info">
              <h3>{grupo.nombre}</h3>
              <p>Creado por {grupo.creador}</p>
              <p>{grupo.cantidadMiembros} miembro{grupo.cantidadMiembros === 1 ? "" : "s"}</p>
            </div>

            <button
              className="codigo-invitacion"
              onClick={(e) => {
                e.stopPropagation();
                handleCopiarCodigo(grupo.codigoInvitacion);
              }}
              title="Copiar código de invitación"
            >
              {codigoCopiado === grupo.codigoInvitacion ? "✅ Copiado" : `📋 ${grupo.codigoInvitacion}`}
            </button>
          </div>
        ))}
      </div>

      {modalActivo && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalActivo === "crear" ? "Crear nuevo grupo" : "Unirme a un grupo"}</h2>

            <input
              type="text"
              autoFocus
              placeholder={
                modalActivo === "crear" ? "Nombre del grupo" : "Código de invitación"
              }
              value={inputValor}
              onChange={(e) => setInputValor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmarModal()}
              disabled={enviando}
            />

            {modalError && <p className="modal-error">{modalError}</p>}

            <div className="modal-actions">
              <button
                className="btn-primario"
                onClick={handleConfirmarModal}
                disabled={enviando}
              >
                {enviando ? "Procesando..." : "Confirmar"}
              </button>
              <button className="btn-secundario" onClick={cerrarModal} disabled={enviando}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grupos;
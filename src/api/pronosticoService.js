import api from "./axios";

// Guarda un pronóstico nuevo o modifica uno existente (upsert en el back)
export const guardarPronostico = async ({ partidoId, golesLocal, golesVisitante }) => {
  const response = await api.post("/pronosticos", {
    partidoId,
    golesLocal,
    golesVisitante
  });

  return response.data;
};

// Trae los pronósticos propios del usuario logueado.
// estado es opcional (ej: "POR_JUGARSE") para filtrar por estado del partido
export const getPronosticosPropios = async (estado) => {
  const response = await api.get("/pronosticos/mis-pronosticos", {
    params: estado ? { estado } : {}
  });

  return response.data;
};
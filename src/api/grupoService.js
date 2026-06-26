import api from "./axios";

export const crearGrupo = async (nombre) => {
  const response = await api.post("/grupos", { nombre });
  return response.data;
};

export const getMisGrupos = async () => {
  const response = await api.get("/grupos/mis-grupos");
  return response.data;
};

export const unirseAGrupo = async (codigoInvitacion) => {
  const response = await api.post("/grupos/unirse", { codigoInvitacion });
  return response.data;
};

export const getRankingGrupo = async (grupoId) => {
  const response = await api.get(`/grupos/${grupoId}/ranking`);
  return response.data;
};
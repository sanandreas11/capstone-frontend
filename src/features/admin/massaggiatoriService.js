import api from "../../api/axios"

export const fetchMassaggiatori = () => api.get("/api/utenti/massaggiatori")
export const addMassaggiatore = (data) =>
  api.post("/api/utenti/massaggiatori", data)
export const deleteMassaggiatore = (id) =>
  api.delete(`/api/utenti/massaggiatori/${id}`)

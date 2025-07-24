import api from "../../api/axios"

export const fetchMassaggi = () => api.get("/api/massaggi")
export const addMassaggio = (data) => api.post("/api/massaggi", data)
export const deleteMassaggio = (id) => api.delete(`/api/massaggi/${id}`)

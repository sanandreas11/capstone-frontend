import api from "../../api/axios"

export const annullaPrenotazione = (id) =>
  api.put(`/api/prenotazioni/${id}/annulla`)

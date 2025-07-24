import React, { useEffect, useState } from "react"
import api from "../api/axios"
import { Container, Table, Spinner, Alert } from "react-bootstrap"

const PrenotazioniAssegnatePage = () => {
  const [prenotazioni, setPrenotazioni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPrenotazioni = async () => {
    try {
      const res = await api.get("/api/prenotazioni/assegnate")
      setPrenotazioni(res.data)
    } catch (err) {
      setError("Errore nel caricamento delle prenotazioni.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrenotazioni()
  }, [])

  return (
    <Container className="mt-4">
      <h2>Prenotazioni Ricevute</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : prenotazioni.length === 0 ? (
        <Alert variant="info">Nessuna prenotazione al momento.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Massaggio</th>
              <th>Data e Ora</th>
              <th>Pagato</th>
              <th>Annullata</th>
            </tr>
          </thead>
          <tbody>
            {prenotazioni.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.utente?.nome} {p.utente?.cognome}
                </td>
                <td>{p.massaggio?.tipo}</td>
                <td>{new Date(p.dataOra).toLocaleString()}</td>
                <td>{p.pagato ? "Sì" : "No"}</td>
                <td>{p.annullata ? "Sì" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default PrenotazioniAssegnatePage

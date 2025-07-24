import React, { useEffect, useState } from "react"
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function PrenotazioniPage() {
  const [prenotazioni, setPrenotazioni] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchPrenotazioni = async () => {
    try {
      const res = await api.get("/api/prenotazioni")
      setPrenotazioni(res.data)
    } catch (error) {
      console.error("Errore nel caricamento delle prenotazioni", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrenotazioni()
  }, [])

  const handleAnnulla = async (id) => {
    try {
      await api.put(`/api/prenotazioni/${id}/annulla`)
      fetchPrenotazioni() // aggiorna lista dopo l'annullamento
    } catch (error) {
      alert(
        "Errore nell'annullamento: " + error.response?.data || error.message
      )
    }
  }

  const handlePaga = async (id) => {
    try {
      const res = await api.post(`/api/prenotazioni/${id}/checkout`)
      window.location.href = res.data // reindirizza a Stripe
    } catch (error) {
      alert(
        "Errore durante il pagamento: " + error.response?.data || error.message
      )
    }
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    )
  }

  if (prenotazioni.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Non hai prenotazioni.</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <h3>Le tue prenotazioni</h3>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Massaggio</th>
            <th>Data/Ora</th>
            <th>Prezzo</th>
            <th>Stato</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {prenotazioni.map((p) => (
            <tr key={p.id}>
              <td>{p.massaggio?.tipo}</td>
              <td>{new Date(p.dataOra).toLocaleString()}</td>
              <td>€{p.massaggio?.prezzo?.toFixed(2)}</td>
              <td>
                {p.annullata ? "Annullata" : p.pagato ? "Pagata" : "Non pagata"}
              </td>
              <td>
                {!p.annullata && !p.pagato && (
                  <>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleAnnulla(p.id)}
                    >
                      Annulla
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handlePaga(p.id)}
                    >
                      Paga ora
                    </Button>
                  </>
                )}
                {p.annullata && <span>Nessuna azione disponibile</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

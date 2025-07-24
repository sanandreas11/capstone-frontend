import React, { useEffect, useState } from "react"
import { Table, Button } from "react-bootstrap"
import api from "../../api/axios"

const AdminPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([])

  const fetch = () => {
    api.get("/api/prenotazioni").then((res) => setPrenotazioni(res.data))
  }

  useEffect(() => {
    fetch()
  }, [])

  const annulla = (id) => {
    api.delete(`/api/prenotazioni/${id}`).then(fetch)
  }

  return (
    <>
      <h5>Prenotazioni</h5>
      <Table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Massaggio</th>
            <th>Data</th>
            <th>Azioni</th>
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
              <td>
                <Button variant="danger" onClick={() => annulla(p.id)}>
                  Annulla
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AdminPrenotazioni

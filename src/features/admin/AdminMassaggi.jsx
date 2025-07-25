import React, { useEffect, useState } from "react"
import { Form, Button, Table } from "react-bootstrap"
import api from "../../api/axios"

const AdminMassaggi = () => {
  const [massaggi, setMassaggi] = useState([])
  const [massaggiatori, setMassaggiatori] = useState([])
  const [form, setForm] = useState({
    tipo: "",
    durata: "",
    prezzo: "",
    massaggiatoreId: "",
  })

  const fetchMassaggi = () => {
    api.get("/api/massaggi").then((res) => setMassaggi(res.data))
  }

  useEffect(() => {
    fetchMassaggi()
    api
      .get("/api/utenti/massaggiatori")
      .then((res) => setMassaggiatori(res.data))
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    api.post("/api/massaggi", form).then(() => {
      fetchMassaggi()
      setForm({ tipo: "", durata: "", prezzo: "", massaggiatoreId: "" })
    })
  }

  const handleDelete = (id) => {
    api
      .delete(`/api/massaggi/${id}`)
      .then(() => fetchMassaggi())
      .catch((err) => console.error("Errore durante la rimozione:", err))
  }

  return (
    <>
      <h5>Gestione Massaggi</h5>
      <Form onSubmit={handleAdd}>
        <Form.Control
          placeholder="Tipo"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        />
        <Form.Control
          placeholder="Durata (minuti)"
          type="number"
          value={form.durata}
          onChange={(e) => setForm({ ...form, durata: e.target.value })}
          className="mt-2"
        />
        <Form.Control
          placeholder="Prezzo (€)"
          type="number"
          value={form.prezzo}
          onChange={(e) => setForm({ ...form, prezzo: e.target.value })}
          className="mt-2"
        />
        <Form.Select
          value={form.massaggiatoreId}
          onChange={(e) =>
            setForm({ ...form, massaggiatoreId: e.target.value })
          }
          className="mt-2"
        >
          <option value="">Scegli massaggiatore</option>
          {massaggiatori.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome} {m.cognome}
            </option>
          ))}
        </Form.Select>
        <Button type="submit" className="mt-2">
          Aggiungi
        </Button>
      </Form>

      <Table className="mt-3">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Durata</th>
            <th>Prezzo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {massaggi.map((m) => (
            <tr key={m.id}>
              <td>{m.tipo}</td>
              <td>{m.durata} min</td>
              <td>€{m.prezzo}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(m.id)}>
                  Rimuovi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default AdminMassaggi

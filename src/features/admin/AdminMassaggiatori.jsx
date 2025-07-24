import React, { useEffect, useState } from "react"
import { Button, Form, Table, Alert } from "react-bootstrap"
import api from "../../api/axios"

const AdminMassaggiatori = () => {
  const [massaggiatori, setMassaggiatori] = useState([])
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  })
  const [message, setMessage] = useState("")

  const fetchMassaggiatori = () => {
    api
      .get("/api/utenti/massaggiatori")
      .then((res) => setMassaggiatori(res.data))
  }

  useEffect(() => {
    fetchMassaggiatori()
  }, [])

  const handleAdd = (e) => {
    e.preventDefault()
    api
      .post("/api/utenti/massaggiatori", form)
      .then(() => {
        setMessage("Massaggiatore aggiunto.")
        fetchMassaggiatori()
        setForm({ nome: "", cognome: "", email: "", password: "" })
      })
      .catch(() => setMessage("Errore durante l'aggiunta."))
  }

  const handleDelete = (id) => {
    api.delete(`/api/utenti/massaggiatori/${id}`).then(() => {
      fetchMassaggiatori()
    })
  }

  return (
    <>
      <h5>Gestione Massaggiatori</h5>
      {message && <Alert>{message}</Alert>}
      <Form onSubmit={handleAdd} className="mb-3">
        <Form.Control
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
        />
        <Form.Control
          placeholder="Cognome"
          value={form.cognome}
          onChange={(e) => setForm({ ...form, cognome: e.target.value })}
          className="mt-2"
        />
        <Form.Control
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-2"
        />
        <Form.Control
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mt-2"
        />
        <Button type="submit" className="mt-2">
          Aggiungi
        </Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {massaggiatori.map((m) => (
            <tr key={m.id}>
              <td>
                {m.nome} {m.cognome}
              </td>
              <td>{m.email}</td>
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

export default AdminMassaggiatori

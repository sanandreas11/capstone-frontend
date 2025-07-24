import React, { useEffect, useState } from "react"
import {
  Table,
  Button,
  Form,
  Container,
  Row,
  Col,
  Alert,
} from "react-bootstrap"
import api from "../api/axios"

const AdminMassaggiatoriPage = () => {
  const [massaggiatori, setMassaggiatori] = useState([])
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  })
  const [message, setMessage] = useState("")

  const fetchMassaggiatori = async () => {
    const res = await api.get("/api/utenti/massaggiatori")
    setMassaggiatori(res.data)
  }

  useEffect(() => {
    fetchMassaggiatori()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      await api.post("/api/utenti/massaggiatori", form)
      setMessage("Massaggiatore aggiunto con successo")
      setForm({ nome: "", cognome: "", email: "", password: "" })
      fetchMassaggiatori()
    } catch (err) {
      console.error(err)
      setMessage("Errore nell'aggiunta del massaggiatore")
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/utenti/massaggiatori/${id}`)
      fetchMassaggiatori()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container className="mt-4">
      <h3>Gestione Massaggiatori</h3>

      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleAdd} className="mb-4">
        <Row>
          <Col>
            <Form.Control
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Cognome"
              value={form.cognome}
              onChange={(e) => setForm({ ...form, cognome: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </Col>
          <Col>
            <Button type="submit">Aggiungi</Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Email</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {massaggiatori.map((m) => (
            <tr key={m.id}>
              <td>{m.nome}</td>
              <td>{m.cognome}</td>
              <td>{m.email}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(m.id)}
                >
                  Rimuovi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default AdminMassaggiatoriPage

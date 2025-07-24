import { useState } from "react"
import axios from "../../api/axios"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    ruolo: "CLIENTE",
  })
  const [errore, setErrore] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", form)
      navigate("/login")
    } catch (err) {
      setErrore("Registrazione fallita")
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 500 }}>
      <h2>Registrati</h2>
      {errore && <Alert variant="danger">{errore}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            value={form.cognome}
            onChange={(e) => setForm({ ...form, cognome: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit">Registrati</Button>
      </Form>
    </Container>
  )
}

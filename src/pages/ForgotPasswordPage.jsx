import React, { useState } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import api from "../api/axios"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)
    try {
      const res = await api.post("/auth/forgot-password", null, {
        params: { email },
      })
      setSuccess("Email inviata con successo!")
    } catch (err) {
      setError(
        "Errore: " + err.response?.data || "Controlla l'indirizzo email."
      )
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3>Recupera Password</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Invia link di recupero
        </Button>
      </Form>

      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
    </Container>
  )
}

export default ForgotPasswordPage

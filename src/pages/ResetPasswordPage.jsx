import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Container, Form, Button, Alert } from "react-bootstrap"
import api from "../api/axios"

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError("Le password non coincidono")
      return
    }

    try {
      await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      })
      setSuccess("Password aggiornata con successo!")
      setTimeout(() => navigate("/login"), 3000)
    } catch (err) {
      setError("Errore nel reset della password: " + (err.response?.data || ""))
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <h3>Reimposta Password</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nuova Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci nuova password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Conferma Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Conferma nuova password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Reimposta password
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

export default ResetPasswordPage

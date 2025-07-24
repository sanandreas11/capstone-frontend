import { useDispatch } from "react-redux"
import { useState } from "react"
import { loginSuccess } from "./authSlice.js"
import api from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errore, setErrore] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrore("")
    try {
      const res = await api.post("/auth/login", { email, password })
      dispatch(loginSuccess({ token: res.data.token, role: res.data.role }))
      navigate("/")
    } catch (err) {
      setErrore("Credenziali non valide")
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {errore && <Alert variant="danger">{errore}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Login
        </Button>
        <p className="mt-2 text-center">
          <Link to="/password-dimenticata">Password dimenticata?</Link>
        </p>
      </Form>
    </Container>
  )
}

import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, clearCart } from "./cartSlice"
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Alert,
} from "react-bootstrap"
import api from "../../api/axios"

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()
  const [dateByItemId, setDateByItemId] = useState({})
  const [timeByItemId, setTimeByItemId] = useState({})
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleDateChange = (id, newDate) => {
    setDateByItemId((prev) => ({ ...prev, [id]: newDate }))
  }

  const handleTimeChange = (id, newTime) => {
    setTimeByItemId((prev) => ({ ...prev, [id]: newTime }))
  }

  const handleCheckout = async () => {
    const missing = cartItems.find(
      (item) => !dateByItemId[item.id] || !timeByItemId[item.id]
    )
    if (missing) {
      setError("Completa data e ora per ogni massaggio.")
      return
    }

    try {
      for (let item of cartItems) {
        const dataOra = `${dateByItemId[item.id]}T${timeByItemId[item.id]}:00`
        await api.post("/api/prenotazioni", {
          massaggioId: item.id,
          dataOra,
        })
      }

      setSuccess("Prenotazioni completate con successo!")
      dispatch(clearCart())
      setError(null)
    } catch (err) {
      console.error(err)
      setError("Errore durante la prenotazione.")
    }
  }

  return (
    <Container className="mt-4">
      <h2>Carrello</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info">Il carrello è vuoto.</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Prezzo</th>
                <th>Durata</th>
                <th>Data</th>
                <th>Ora</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.tipo}</td>
                  <td>€{item.prezzo.toFixed(2)}</td>
                  <td>{item.durata} min</td>
                  <td>
                    <Form.Control
                      type="date"
                      value={dateByItemId[item.id] || ""}
                      onChange={(e) =>
                        handleDateChange(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="time"
                      value={timeByItemId[item.id] || ""}
                      onChange={(e) =>
                        handleTimeChange(item.id, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Rimuovi
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Row className="mt-3">
            <Col>
              <Button variant="secondary" onClick={() => dispatch(clearCart())}>
                Svuota carrello
              </Button>
            </Col>
            <Col className="text-end">
              <Button variant="success" onClick={handleCheckout}>
                Conferma Prenotazioni
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  )
}

export default CartPage

import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, clearCart } from "./cartSlice.js"
import { Container, Table, Button, Alert } from "react-bootstrap"

export default function CartPage() {
  const cart = useSelector((state) => state.cart.items)
  const dispatch = useDispatch()

  const handleRemove = (id) => {
    dispatch(removeFromCart(id))
  }

  if (cart.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">Il tuo carrello è vuoto.</Alert>
      </Container>
    )
  }

  const totale = cart.reduce((acc, m) => acc + m.prezzo, 0)

  return (
    <Container className="mt-5">
      <h3>Il tuo carrello</h3>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Durata</th>
            <th>Prezzo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((m) => (
            <tr key={m.id}>
              <td>{m.tipo}</td>
              <td>{m.durata} min</td>
              <td>€{m.prezzo.toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemove(m.id)}
                >
                  Rimuovi
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5>Totale: €{totale.toFixed(2)}</h5>
      <Button variant="success" onClick={() => alert("Procedi al pagamento")}>
        Procedi
      </Button>{" "}
      <Button variant="secondary" onClick={() => dispatch(clearCart())}>
        Svuota carrello
      </Button>
    </Container>
  )
}

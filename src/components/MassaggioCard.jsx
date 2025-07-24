import React from "react"
import { Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../features/cart/cartSlice.js"

const MassaggioCard = ({ massaggio }) => {
  const navigate = useNavigate()

  const handlePrenota = () => {
    navigate(`/prenota/${massaggio.id}`)
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{massaggio.tipo}</Card.Title>
        <Card.Text className="flex-grow-1">
          Durata: {massaggio.durata} min
          <br />
          Prezzo: €{massaggio.prezzo.toFixed(2)}
        </Card.Text>
        <Button
          variant="outline-success"
          onClick={() => dispatch(addToCart(massaggio))}
        >
          Aggiungi al carrello
        </Button>
      </Card.Body>
    </Card>
  )
}

export default MassaggioCard

import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap"
import api from "../api/axios"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../features/cart/cartSlice"

export default function MassaggiPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const role = useSelector((state) => state.auth.role)

  const [massaggi, setMassaggi] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedMessage, setAddedMessage] = useState(null)
  const [filters, setFilters] = useState({
    prezzoMin: "",
    prezzoMax: "",
    durataMin: "",
    durataMax: "",
  })

  const fetchMassaggi = async () => {
    setLoading(true)
    const params = {}
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params[k] = v
    })
    const res = await api.get("/api/massaggi", { params })
    setMassaggi(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMassaggi()
  }, [])

  return (
    <Container className="mt-4">
      <h2>Massaggi</h2>

      <Form
        className="mb-3"
        onSubmit={(e) => {
          e.preventDefault()
          fetchMassaggi()
        }}
      >
        <Row>
          <Col>
            <Form.Control
              type="number"
              placeholder="Prezzo min"
              value={filters.prezzoMin}
              onChange={(e) =>
                setFilters({ ...filters, prezzoMin: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Prezzo max"
              value={filters.prezzoMax}
              onChange={(e) =>
                setFilters({ ...filters, prezzoMax: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Durata min (min)"
              value={filters.durataMin}
              onChange={(e) =>
                setFilters({ ...filters, durataMin: e.target.value })
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              placeholder="Durata max (min)"
              value={filters.durataMax}
              onChange={(e) =>
                setFilters({ ...filters, durataMax: e.target.value })
              }
            />
          </Col>
          <Col>
            <Button type="submit">Applica filtri</Button>
          </Col>
        </Row>
      </Form>

      {addedMessage && (
        <div className="alert alert-success" role="alert">
          {addedMessage}
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Prezzo (€)</th>
              <th>Durata (min)</th>
              <th>Massaggiatore</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {massaggi.map((m) => {
              const isInCart = cartItems.some((item) => item.id === m.id)

              return (
                <tr key={m.id}>
                  <td>{m.tipo}</td>
                  <td>{m.prezzo.toFixed(2)}</td>
                  <td>{m.durata}</td>
                  <td>
                    {m.massaggiatore.nome} {m.massaggiatore.cognome}
                  </td>
                  <td>
                    {role === "ADMIN" ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={async () => {
                          await api.delete(`/api/massaggi/${m.id}`)
                          fetchMassaggi()
                        }}
                      >
                        Elimina
                      </Button>
                    ) : (
                      <Button
                        variant="outline-success"
                        size="sm"
                        disabled={isInCart}
                        onClick={() => {
                          dispatch(addToCart(m))
                          setAddedMessage(`"${m.tipo}" aggiunto al carrello!`)
                          setTimeout(() => setAddedMessage(null), 3000)
                        }}
                      >
                        {isInCart ? "Già nel carrello" : "Aggiungi"}
                      </Button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

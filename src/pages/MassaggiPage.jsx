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
import { useSelector } from "react-redux"

export default function MassaggiPage() {
  const [massaggi, setMassaggi] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    prezzoMin: "",
    prezzoMax: "",
    durataMin: "",
    durataMax: "",
  })
  const role = useSelector((state) => state.auth.role)

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
              {role === "ADMIN" && <th>Azioni</th>}
            </tr>
          </thead>
          <tbody>
            {massaggi.map((m) => (
              <tr key={m.id}>
                <td>{m.tipo}</td>
                <td>{m.prezzo.toFixed(2)}</td>
                <td>{m.durata}</td>
                <td>
                  {m.massaggiatore.nome} {m.massaggiatore.cognome}
                </td>
                {role === "ADMIN" && (
                  <td>
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
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

import React from "react"
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import { Container, Row, Col } from "react-bootstrap"

const HomePage = () => {
  return (
    <Container className="mt-5 text-center">
      <h1 className="mb-4">Treatwell per massaggi</h1>

      <Row>
        <Col md={4}>
          <img
            src={img1}
            alt="Foto 1"
            className="img-fluid rounded"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </Col>
        <Col md={4}>
          <img
            src={img2}
            alt="Foto 2"
            className="img-fluid rounded"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </Col>
        <Col md={4}>
          <img
            src={img3}
            alt="Foto 3"
            className="img-fluid rounded"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </Col>
        <h2 className="mt-3">Tipi di Massaggio</h2>
        <ul className="list-unstyled mt-3">
          <li className="fs-4">Massaggio decontratturante</li>
          <li className="fs-4">Massaggio svedese</li>
          <li className="fs-4">Massaggio sportivo</li>
          <li className="fs-4">Taping cinesiologico muscolare</li>
          <li className="fs-4">Massaggio anticellulite</li>
          <li className="fs-4">Linfodrenaggio Vodder</li>
          <li className="fs-4">Massaggio Maori</li>
        </ul>
      </Row>
    </Container>
  )
}

export default HomePage

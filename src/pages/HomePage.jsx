import React from "react"
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import { Container, Row, Col } from "react-bootstrap"

const HomePage = () => {
  return (
    <Container className="mt-5 text-center">
      <h2 className="mb-4">Benvenuto nel nostro centro massaggi</h2>

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
      </Row>
    </Container>
  )
}

export default HomePage

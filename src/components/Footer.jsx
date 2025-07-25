import React from "react"
import { Container, Row, Col } from "react-bootstrap"

function Footer() {
  return (
    <footer className="bg-light mt-auto py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Contattaci</h5>
            <p>
              <a
                href="https://www.instagram.com/refi_nika"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <br />
              <a
                href="https://wa.me/393451604215"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
          </Col>
          <Col md={4}>
            <h5>Link utili</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">Chi siamo</a>
              </li>
              <li>
                <a href="/contact">Contatti</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-md-end">
            <p>
              © {new Date().getFullYear()} Efi Method. Tutti i diritti
              riservati.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

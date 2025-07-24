import React from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"

const AboutPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Chi Siamo</h1>
      <Row className="mb-5">
        <Col md={6}>
          <p>
            Benvenuti su <strong>Capstone Massaggi</strong>! Siamo un team di
            professionisti del benessere dedicati a offrire un servizio di
            prenotazione semplice, intuitivo e accessibile a tutti. Il nostro
            obiettivo è mettere in contatto clienti con massaggiatori
            qualificati, offrendo esperienze rilassanti e professionali in tutta
            sicurezza.
          </p>
          <p>
            Il nostro progetto è nato come parte di un capstone finale,
            combinando tecnologia e benessere per rendere più facile l'accesso a
            trattamenti di qualità ovunque tu sia.
          </p>
        </Col>
        <Col md={6}>
          <Carousel>
            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/Qz3WhgGfkvM"
                  title="Massaggio Relax"
                  allowFullScreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Rilassante</h5>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/VT3wzKhvY1g"
                  title="Massaggio Thai"
                  allowFullScreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Thai Tradizionale</h5>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/G-YI8fBULb4"
                  title="Massaggio Sportivo"
                  allowFullScreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Sportivo</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutPage

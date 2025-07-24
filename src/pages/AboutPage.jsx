import React from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"

const AboutPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Chi Siamo</h1>
      <Row className="mb-5">
        <Col md={6}>
          <p>
            Benvenuti sul nostro sito <strong>Efi Method</strong>! Siamo un team
            di professionisti del benessere dedicati a offrire un servizio di
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
          <Carousel interval={null} pause="hover">
            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/_2Ko9qVnw1s?si=91lwIypMsyMojThw"
                  title="Massaggio Svedese"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Svedese</h5>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/pZrHC8G4CXU?si=dCfVlF6MsrKarGc-"
                  title="Massaggio Sportivo"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Sportivo</h5>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <div className="ratio ratio-16x9">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/r7Vv8pKMYLE?si=wVCuNgqt7dPok8kE"
                  title="Massaggio Decontratturante"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>
              <Carousel.Caption>
                <h5>Massaggio Decontratturante</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}

export default AboutPage

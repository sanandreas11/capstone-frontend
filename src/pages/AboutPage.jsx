import React from "react"
import { Container, Row, Col, Carousel } from "react-bootstrap"

const AboutPage = () => {
  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Chi Siamo</h1>
      <Row className="mb-5">
        <Col md={6}>
          <h2>
            Benvenuti sul nostro sito <strong>Efi Method</strong>! Mi chiamo
            Efi, e mi sto occupo di massaggi con un approccio mirato al
            benessere fisico e al riequilibrio muscolare. Offro trattamenti che
            combinano tecniche olistiche e sportive, con particolare attenzione
            alla postura, alla mobilità e al rilascio delle tensioni accumulate.
            Il mio obbiettivo è aiutare le persone a ritrovare leggerezza e
            funzionalità attraverso un lavoro serio, competente e rispettoso.
            Ogni trattamento è personalizzato in base alle esigenze specifiche
            della persona. Mi aggiorno costantemente per offrire un servizio
            efficace, professionale e in continua evoluzione.
          </h2>
          <h2>
            Il nostro progetto è nato come parte di un capstone finale,
            combinando tecnologia e benessere per rendere più facile l'accesso a
            trattamenti di qualità ovunque tu sia.
          </h2>
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

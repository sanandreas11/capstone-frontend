import { Tabs, Tab, Container } from "react-bootstrap"
import AdminMassaggiatori from "./AdminMassaggiatori"
import AdminMassaggi from "./AdminMassaggi"
import AdminPrenotazioni from "./AdminPrenotazioni"

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h2>Dashboard Admin</h2>
      <Tabs defaultActiveKey="massaggiatori" className="mt-3">
        <Tab eventKey="massaggiatori" title="Massaggiatori">
          <AdminMassaggiatori />
        </Tab>
        <Tab eventKey="massaggi" title="Massaggi">
          <AdminMassaggi />
        </Tab>
        <Tab eventKey="prenotazioni" title="Prenotazioni">
          <AdminPrenotazioni />
        </Tab>
      </Tabs>
    </Container>
  )
}

export default AdminDashboard

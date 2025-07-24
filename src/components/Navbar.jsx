import { Navbar, Nav, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../features/auth/authSlice.js"
import { useEffect, useState } from "react"
import logo from "../assets/logo.png"

const Navigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Prendi token e ruolo dallo store Redux
  const token = useSelector((state) => state.auth.token)
  const role = useSelector((state) => state.auth.role)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const [isLoggedIn, setIsLoggedIn] = useState(!!token)

  useEffect(() => {
    setIsLoggedIn(!!token)
  }, [token])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            width="100"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* LINKS A SINISTRA */}
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                {role === "ADMIN" && (
                  <>
                    <Nav.Link as={Link} to="/admin">
                      Admin
                    </Nav.Link>
                    <Nav.Link as={Link} to="/admin/massaggiatori">
                      Massaggiatori
                    </Nav.Link>
                  </>
                )}

                {role === "MASSAGGIATORE" && (
                  <Nav.Link as={Link} to="/prenotazioni/ricevute">
                    Prenotazioni Ricevute
                  </Nav.Link>
                )}

                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

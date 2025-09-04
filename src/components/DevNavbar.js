// src/components/DevNavbar.js
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./DevNavbar.css";
import { getUser, logout, AUTH_EVENT } from "../services/auth";

export default function DevNavbar() {
  const [user, setUser] = useState(() => getUser());
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setUser(getUser());
    window.addEventListener('storage', sync);      // cambios en otra pestaña
    window.addEventListener(AUTH_EVENT, sync);     // cambios en esta pestaña
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="dev-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/admin">⚙️ Panel Dev</Navbar.Brand>
        <Navbar.Toggle aria-controls="dev-navbar-nav" />
        <Navbar.Collapse id="dev-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/home">🏠 Home</Nav.Link>
            <Nav.Link as={Link} to="/admin/clientes/empresas">🏢 Empresas</Nav.Link>
            <Nav.Link as={Link} to="/admin/clientes/sucursales">📍 Sucursales</Nav.Link>
            <Nav.Link as={Link} to="/admin/servicios/nuevo">🛠️ Servicios</Nav.Link>
            <Nav.Link as={Link} to="/admin/novedades">📰 Novedades</Nav.Link>
            {user && (
              <span className="ms-3 small">
                {user.username} ({user.role})
                <button className="btn btn-link ms-2 p-0" onClick={handleLogout}>
                  salir
                </button>
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



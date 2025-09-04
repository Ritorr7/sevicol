import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import './NavbarSevicol.css';

const LG_BREAKPOINT = 992;

const NavbarSevicol = () => {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0
  );

  useEffect(() => {
    document.body.classList.toggle('menu-open', expanded);
    if (expanded) setHidden(false);
    return () => document.body.classList.remove('menu-open');
  }, [expanded]);

  useEffect(() => {
    const onScroll = () => {
      if (expanded) return;
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y > lastY.current && y > 80) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };

    const onResize = () => {
      if (window.innerWidth >= LG_BREAKPOINT && expanded) {
        setExpanded(false); // cerrar menú al pasar a desktop
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [expanded]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      onToggle={(isExpanded) => {
        setExpanded(isExpanded);
        if (isExpanded) setHidden(false);
      }}
      className={`sevicol-navbar ${hidden ? 'navbar-hidden' : ''} ${scrolled ? 'navbar-scrolled' : ''} ${expanded ? 'menu-open' : ''}`}
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <Container fluid className="nav-shell">

        {/* Izquierda (desktop) */}
        <Nav className="d-none d-lg-flex me-auto gap-3">
          <Nav.Link as={HashLink} smooth to="/clientes" className="pill-link">Clientes</Nav.Link>
          <Nav.Link as={HashLink} smooth to="/servicios" className="pill-link">Servicios</Nav.Link>
          <Nav.Link as={HashLink} smooth to="/novedades" className="pill-link">Novedades</Nav.Link>
        </Nav>

        {/* Logo centro */}
        <Navbar.Brand href="/" className="mx-auto">
          <Image src="/assets/sevicol_logo3.png" alt="Sevicol Logo" className="logo-nav" />
        </Navbar.Brand>

        {/* Derecha (desktop) */}
        <Nav className="d-none d-lg-flex ms-auto gap-3">
          <Nav.Link as={HashLink} smooth to="/quienes-somos" className="pill-link">Quienes Somos</Nav.Link>
          <Nav.Link as={HashLink} smooth to="recursos" className="pill-link">Recursos Humanos</Nav.Link>
          <Nav.Link as={HashLink} smooth to="/contacto" className="pill-link">Contáctenos</Nav.Link>
        </Nav>

        {/* Toggler móvil */}
        <Navbar.Toggle
          aria-controls="sevicol-nav"
          className={`hamburger-btn ${expanded ? 'open' : ''} ms-auto d-lg-none`}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>

        {/* Menú móvil — oculto en lg+ */}
        <Navbar.Collapse id="sevicol-nav" className="mobile-menu d-lg-none">
          <div className="mobile-logo text-center py-3">
            <Image src="/assets/sevicol_logo4.png" alt="Sevicol" style={{ height: '48px' }} />
          </div>
          <Nav className="flex-column text-center">
            <Nav.Link as={HashLink} smooth to="/servicios" onClick={() => setExpanded(false)}>Servicios</Nav.Link>
            <Nav.Link as={HashLink} smooth to="/novedades"   onClick={() => setExpanded(false)}>Novedades</Nav.Link>
            <Nav.Link as={HashLink} smooth to="/clientes"  onClick={() => setExpanded(false)}>Clientes</Nav.Link>
            <Nav.Link as={HashLink} smooth to="/quienes-somos"   onClick={() => setExpanded(false)}>Quienes Somos</Nav.Link>
            <Nav.Link as={HashLink} smooth to="recursos"   onClick={() => setExpanded(false)}>Recursos Humanos</Nav.Link>
            <Nav.Link as={HashLink} smooth to="/contacto"   onClick={() => setExpanded(false)}>Contáctanos</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavbarSevicol;




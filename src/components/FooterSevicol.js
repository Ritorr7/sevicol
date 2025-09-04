import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import "./FooterSevicol.css";

const FooterSevicol = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-dark text-white pt-4 mt-5 footer">
      <Container>
        {/* gy-4 agrega espacio vertical entre columnas cuando se apilan */}
        <Row className="align-items-start gy-4">
          {/* Izquierda: logo + datos (se permite wrap) */}
          <Col xs={12} md={5}>
            <div className="left-wrap">
              <img
                className="footer-logo"
                src="/assets/sevicol_logo4.png" /* en public/assets */
                alt="Sevicol"
              />
              <div className="footer-info">
                <p><i className="bi bi-telephone"></i> Tel: 4552 3923</p>
                <p><i className="bi bi-envelope"></i> Mail: contacto@sevicol.com.uy</p>
                <p><i className="bi bi-geo-alt"></i> Bvar. José Enrique Rodó 156 Rosario - Uruguay</p>
                <p><i className="bi bi-alarm"></i> Lunes a Viernes 8:00 a 17:00hs, Sábados 8:00 a 12:00hs</p>
              </div>
            </div>
          </Col>

          {/* Centro: flecha arriba */}
          <Col xs={12} md={2} className="text-center">
            <button
              type="button"
              className="arrow-btn footer-icon"
              onClick={scrollToTop}
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <FaArrowUp size={28} />
            </button>
          </Col>

          {/* Derecha: redes */}
          <Col xs={12} md={5} className="text-md-end text-center">
            <div className="footer-social text-center">
              <p className="mb-1">Síguenos</p>
              <a
                href="https://maps.app.goo.gl/9AYpGYXEhb2hax5k7"
                target="_blank"
                rel="noreferrer"
                aria-label="Google Maps"
              >
                <i className="bi bi-geo-alt-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/sevicol_seguridad/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/sevicol"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0 small">©2025 Aura MKT</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterSevicol;


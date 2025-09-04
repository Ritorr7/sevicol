import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Servicios.css';
import './Home.css';
import Hero from "../components/Hero";

const Servicios = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/servicios')
      .then(res => setServicios(res.data))
      .catch(err => console.error('Error al obtener servicios:', err));
  }, []);

  return (
    <> 
       <Hero
        subtitle="NUESTROS SERVICIOS"
        title="Protección a tu medida"
        description="Brindamos soluciones integrales de seguridad física, 
              electrónica y tecnológica, adaptadas a las necesidades de cada cliente."
        variant="dark"     // fondo oscuro sin imagen (como pediste)
        align="center"
        height="sm"
      />    
      <Container className="my-5 servicios-section">
        <Row>
          {servicios.map(servicio => {
            const iconClass = `bi ${String(servicio.icon || servicio.icono || '')
              .replace(/^bi\s+/, '')} fs-1 icon-serv`;

            const imgUrl = servicio.imagen
              ? `http://localhost:5000/uploads/servicios/${servicio.imagen}`
              : null;

            return (
              <Col key={servicio.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">

                  <Card.Body>
                    <div className="text-center icon-serv mb-3">
                      <i className={iconClass} aria-hidden="true"></i>
                    </div>

                    <Card.Title className="text-center titulo-card"><strong>
                      {servicio.titulo}</strong>
                    </Card.Title>

                    <Card.Text className="service-description">
                      {servicio.descripcion}
                    </Card.Text>
                  </Card.Body>

                  {/* Opción A: Avatar redondo*/}
                  {/* {imgUrl && (
                    <div className="service-photo">
                      <img src={imgUrl} alt={servicio.titulo} />
                    </div>
                  )} */}

                  {/* Opción B: Banner moderno al final (recomendada) */}
                  {imgUrl && (
                    <div className="service-banner">
                      <img src={imgUrl} alt={servicio.titulo} className="img-fluid rounded shadow img-modern"/>
                    </div>
                  )}

                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>      
    </>
  );
};

export default Servicios;




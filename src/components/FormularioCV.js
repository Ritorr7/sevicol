// src/pages/FormularioCV.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import Hero from '../components/Hero';
import './FormularioCV.css';

const API = 'http://localhost:5000';

const FormularioCV = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nac: '',
    foto: null,
    direccion: '',
    departamento: '',
    ciudad: '',
    telefono: '',
    email: '',
    situacion_laboral: 'Sin trabajo',
    detalle_situacion: '',
    estudios: '',
    ref_laborales: '',
    ref_personales: '',
    motivacion: ''
  });

  const [ubicaciones, setUbicaciones] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [variant, setVariant] = useState('info');

  useEffect(() => {
    axios.get(`${API}/api/ubicaciones`)
      .then(res => setUbicaciones(res.data || {}))
      .catch(err => console.error('Error ubicaciones:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files?.[0] || null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDepartamentoChange = (e) => {
    setFormData(prev => ({ ...prev, departamento: e.target.value, ciudad: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (v !== null && v !== undefined) data.append(k, v);
      });

      await axios.post(`${API}/api/cv/upload`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setVariant('success');
      setMensaje('¡Gracias! Recibimos tu postulación.');

      setFormData({
        nombre: '',
        apellido: '',
        fecha_nac: '',
        foto: null,
        direccion: '',
        departamento: '',
        ciudad: '',
        telefono: '',
        email: '',
        situacion_laboral: 'Sin trabajo',
        detalle_situacion: '',
        estudios: '',
        ref_laborales: '',
        ref_personales: '',
        motivacion: ''
      });

      setTimeout(() => setMensaje(''), 5000);
    } catch (err) {
      setVariant('danger');
      setMensaje(err?.response?.data?.error || 'Error al enviar la postulación');
      setTimeout(() => setMensaje(''), 5000);
    }
  };

  return (
    <>
      <Hero
        subtitle="RECURSOS HUMANOS"
        title="Envíanos tu currículum"
        description="Sumate a SEVICOL. Cargá tus datos y contanos por qué querés trabajar con nosotros."
        variant="dark"
        align="center"
        height="sm"
      />

      <main className="cv-page">
        <section className="cv-container card-like">
          <h3 className="cv-heading">Completa tus datos</h3>

          <Form onSubmit={handleSubmit} className="cv-form">
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Apellido *</Form.Label>
                  <Form.Control
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    name="fecha_nac"
                    value={formData.fecha_nac}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Foto (JPG/PNG/WEBP, máx 5MB)</Form.Label>
                  <Form.Control
                    type="file"
                    name="foto"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleChange}
                    key={formData.foto ? formData.foto.name : ''}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleDepartamentoChange}
                  >
                    <option value="">Selecciona un departamento</option>
                    {Object.keys(ubicaciones).map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    disabled={!formData.departamento}
                  >
                    <option value="">Selecciona una ciudad</option>
                    {formData.departamento &&
                      (ubicaciones[formData.departamento] || []).map(ciudad => (
                        <option key={ciudad} value={ciudad}>{ciudad}</option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-0">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Situación laboral</Form.Label>
                  <Form.Select
                    name="situacion_laboral"
                    value={formData.situacion_laboral}
                    onChange={handleChange}
                  >
                    <option>Sin trabajo</option>
                    <option>Con trabajo</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Detalle de la situación laboral</Form.Label>
                  <Form.Control
                    name="detalle_situacion"
                    value={formData.detalle_situacion}
                    onChange={handleChange}
                    placeholder="Disponibilidad, horarios, aviso previo, etc."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mt-3">
              <Form.Label>Estudios</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="estudios"
                value={formData.estudios}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Referencias laborales</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ref_laborales"
                value={formData.ref_laborales}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Referencias personales</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ref_personales"
                value={formData.ref_personales}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>¿Por qué quiere trabajar en SEVICOL?</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="motivacion"
                value={formData.motivacion}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="cv-actions">
              <Button type="submit" className="mt-3">Enviar</Button>
            </div>

            {mensaje && <Alert className="mt-3" variant={variant}>{mensaje}</Alert>}
          </Form>
        </section>
      </main>
    </>
  );
};

export default FormularioCV;






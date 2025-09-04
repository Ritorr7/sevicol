import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ServicioForm = () => {
  const [formData, setFormData] = useState({
    icono: '',
    titulo: '',
    descripcion: '',
    imagen: null,
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('icono', formData.icono);
    data.append('titulo', formData.titulo);
    data.append('descripcion', formData.descripcion);
    data.append('imagen', formData.imagen);

    try {
      await axios.post('http://localhost:5000/api/servicios/crear', data);
      setMensaje('Servicio creado exitosamente');
      setFormData({
        icono: '',
        titulo: '',
        descripcion: '',
        imagen: null,
      });
    } catch (error) {
      console.error('Error al crear servicio:', error);
      setMensaje('Hubo un error al crear el servicio');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Agregar Nuevo Servicio</h2>
      {mensaje && <Alert variant="info" className="mt-3">{mensaje}</Alert>}
      <Form onSubmit={handleSubmit} className="mt-4">

        <Form.Group controlId="icono">
          <Form.Label>Ícono (clase de Bootstrap Icons)</Form.Label>
          <Form.Control
            type="text"
            name="icono"
            value={formData.icono}
            onChange={handleChange}
            placeholder="Ej: bi-shield-check"
            required
          />
        </Form.Group>

        <Form.Group controlId="titulo" className="mt-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="descripcion" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="descripcion"
            rows={3}
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="imagen" className="mt-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" className="mt-4" variant="primary">
          Guardar Servicio
        </Button>
      </Form>
    </Container>
  );
};

export default ServicioForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Container } from 'react-bootstrap';

const ServiciosAdmin = () => {
  const [servicios, setServicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    titulo: '',
    descripcion: '',
    icono: '',
    imagen: null
  });

  const fetchServicios = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/servicios');
      setServicios(res.data);
    } catch (err) {
      console.error('Error al cargar servicios:', err);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('titulo', formData.titulo);
    data.append('descripcion', formData.descripcion);
    data.append('icono', formData.icono);
    if (formData.imagen) data.append('imagen', formData.imagen);

    try {
      if (formData.id) {
        await axios.put(`http://localhost:5000/api/servicios/${formData.id}`, data);
      } else {
        await axios.post('http://localhost:5000/api/servicios/crear', data);
      }
      fetchServicios();
      handleClose();
    } catch (err) {
      console.error('Error al guardar servicio:', err);
    }
  };

  const handleEdit = (servicio) => {
    setFormData({
      id: servicio.id,
      titulo: servicio.titulo,
      descripcion: servicio.descripcion,
      icono: servicio.icono,
      imagen: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este servicio?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/servicios/${id}`);
      fetchServicios();
    } catch (err) {
      console.error('Error al eliminar servicio:', err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ id: null, titulo: '', descripcion: '', icono: '', imagen: null });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Administrar Servicios</h2>
      <Button onClick={() => setShowModal(true)} className="mb-3">Nuevo Servicio</Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Ícono</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(s => (
            <tr key={s.id}>
              <td>{s.titulo}</td>
              <td>{s.descripcion}</td>
              <td><i className={`bi ${s.icono}`}></i> {s.icono}</td>
              <td>
                {s.imagen && (
                  <img
                    src={`http://localhost:5000/uploads/servicios/${s.imagen}`}
                    alt="servicio"
                    style={{ width: '60px', height: 'auto' }}
                  />
                )}
              </td>
              <td>
                <Button variant="primary" size="sm" onClick={() => handleEdit(s)}>Editar</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(s.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear o editar */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? 'Editar Servicio' : 'Nuevo Servicio'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ícono (Bootstrap Icons)</Form.Label>
              <Form.Control type="text" name="icono" value={formData.icono} onChange={handleChange} placeholder="Ej: bi-alarm-fill" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" name="imagen" accept="image/*" onChange={handleChange} />
            </Form.Group>

            <Button type="submit" className="mt-3">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ServiciosAdmin;

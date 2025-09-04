// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios'; // o import http from '../services/http';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../services/auth';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', credenciales);
      // data = { token, user: { id, username, role } }
      saveAuth(data.token, data.user);
      navigate('/admin');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 560 }}>
      <h2 className="mb-4">Acceso Administrador</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>

        <Button type="submit">Ingresar</Button>
      </Form>
    </Container>
  );
};

export default Login;



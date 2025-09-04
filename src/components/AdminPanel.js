import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Form, Row, Col, Button, Image } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getToken } from '../services/auth';

const API = 'http://localhost:5000';

const AdminPanel = () => {
  const [rows, setRows] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [filtros, setFiltros] = useState({ departamento: '', ciudad: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate('/login', { replace: true });
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const { data } = await axios.get(`${API}/api/cv/listado`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setRows(data || []);
        setFiltered(data || []);

        const deps = Array.from(new Set((data || []).map(r => r.departamento).filter(Boolean)))
          .sort((a, b) => a.localeCompare(b));
        setDepartamentos(deps);
      } catch (err) {
        console.error('Error listado:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filtros.departamento) {
      const c = rows
        .filter(r => r.departamento === filtros.departamento)
        .map(r => r.ciudad)
        .filter(Boolean);
      setCiudades(Array.from(new Set(c)).sort((a, b) => a.localeCompare(b)));
    } else setCiudades([]);
  }, [filtros.departamento, rows]);

  const handleFiltro = (e) => {
    const { name, value } = e.target;
    const f = { ...filtros, [name]: value, ...(name === 'departamento' ? { ciudad: '' } : null) };
    setFiltros(f);

    const out = rows.filter(r =>
      (f.departamento ? r.departamento === f.departamento : true) &&
      (f.ciudad ? r.ciudad === f.ciudad : true)
    );
    setFiltered(out);
  };

  const exportarExcel = () => {
    if (!filtered.length) return;
    const data = filtered.map(r => ({
      Nombre: r.nombre,
      Apellido: r.apellido,
      'Fecha Nac.': r.fecha_nac ? new Date(r.fecha_nac).toLocaleDateString() : '',
      Dirección: r.direccion || '',
      Departamento: r.departamento || '',
      Ciudad: r.ciudad || '',
      Teléfono: r.telefono || '',
      Email: r.email || '',
      'Situación laboral': r.situacion_laboral || '',
      'Detalle situación': r.detalle_situacion || '',
      Estudios: r.estudios || '',
      'Ref. laborales': r.ref_laborales || '',
      'Ref. personales': r.ref_personales || '',
      Motivación: r.motivacion || '',
      Fecha: r.fecha ? new Date(r.fecha).toLocaleString() : '',
      Foto: r.foto || ''
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Postulaciones');
    XLSX.writeFile(wb, 'postulaciones_sevicol.xlsx');
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Postulaciones recibidas</h2>

      <Row className="mb-4 g-2">
        <Col md={4}>
          <Form.Select name="departamento" value={filtros.departamento} onChange={handleFiltro}>
            <option value="">Filtrar por departamento</option>
            {departamentos.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            name="ciudad"
            value={filtros.ciudad}
            onChange={handleFiltro}
            disabled={!filtros.departamento}
          >
            <option value="">Filtrar por ciudad</option>
            {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
          </Form.Select>
        </Col>
        <Col md={4} className="text-md-end">
          <Button variant="success" onClick={exportarExcel} disabled={!filtered.length}>
            Exportar a Excel
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha nac.</th>
            <th>Dirección</th>
            <th>Depto</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Situación</th>
            <th>Detalle</th>
            <th>Estudios</th>
            <th>Ref. lab.</th>
            <th>Ref. pers.</th>
            <th>Motivación</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(r => (
            <tr key={r.id}>
              <td style={{ width: 80 }}>
                {r.foto ? (
                  <a
                    href={`http://localhost:5000/uploads/postulaciones/${r.foto}`}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Ver foto
                  </a>
                ) : '—'}
              </td>
              <td>{r.nombre}</td>
              <td>{r.apellido}</td>
              <td>{r.fecha_nac ? new Date(r.fecha_nac).toLocaleDateString() : '—'}</td>
              <td>{r.direccion || '—'}</td>
              <td>{r.departamento || '—'}</td>
              <td>{r.ciudad || '—'}</td>
              <td>{r.telefono || '—'}</td>
              <td>{r.email}</td>
              <td>{r.situacion_laboral}</td>
              <td>{r.detalle_situacion || '—'}</td>
              <td className="text-wrap">{r.estudios || '—'}</td>
              <td className="text-wrap">{r.ref_laborales || '—'}</td>
              <td className="text-wrap">{r.ref_personales || '—'}</td>
              <td className="text-wrap">{r.motivacion || '—'}</td>
              <td>{r.fecha ? new Date(r.fecha).toLocaleString() : '—'}</td>
            </tr>
          ))}
          {!filtered.length && (
            <tr><td colSpan={16} className="text-center text-muted py-4">No hay resultados.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;


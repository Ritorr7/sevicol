// src/pages/AdminHome.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import { getHomeSections, updateHomeSection, updateHomeSectionWithImage } from '../services/homeApi';

// defaults para que SIEMPRE haya formularios
const DEFAULTS = [
  { key: 'hero',      title: '', subtitle: '', content: '', cta_text: 'Ver Servicios', cta_link: '#servicios', order: 10, enabled: 1, image_url: '' },
  { key: 'servicios', title: 'Nuestros Servicios', subtitle: '', content: '', cta_text: 'Todos Nuestros Servicios', cta_link: '/servicios', order: 20, enabled: 1, image_url: '' },
  { key: 'novedades', title: 'Novedades', subtitle: '', content: '', cta_text: 'Ver todas las noticias', cta_link: '/noticias', order: 30, enabled: 1, image_url: '' },
  { key: 'trabaja',   title: 'Trabaja con nosotros', subtitle: '', content: '', cta_text: 'Enviar CV', cta_link: '/formulario', order: 40, enabled: 1, image_url: '' },
];

export default function AdminHome() {
  const [rows, setRows] = useState([]);
  const [savingKey, setSavingKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getHomeSections();               // array desde la API
      const map = Object.fromEntries((Array.isArray(data) ? data : []).map(s => [s.key, s]));
      // mezcla con defaults para que siempre se vean los 4
      const merged = DEFAULTS.map(d => ({ ...d, ...(map[d.key] || {}) }));
      // orden seguro
      merged.sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
      setRows(merged);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const setField = (idx, k, v) => {
    setRows(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [k]: v };
      return next;
    });
  };

  const handleSave = async (s) => {
    try {
      setSavingKey(s.key);
      const fields = {
        title: s.title,
        subtitle: s.subtitle,
        content: s.content,
        cta_text: s.cta_text,
        cta_link: s.cta_link,
        order: s.order,
        enabled: s.enabled ? 1 : 0,
      };
      if (s._file) {
        await updateHomeSectionWithImage(s.key, fields, s._file);
      } else {
        await updateHomeSection(s.key, fields);
      }
      await load();
    } catch (e) {
      alert(e.message);
    } finally {
      setSavingKey(null);
    }
  };

  const cards = useMemo(() => rows, [rows]);

  return (
    <div className="section-wide py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="font-anton">Administrar Home</h2>
      </div>

      {loading && <div className="text-center text-muted py-5"><Spinner animation="border" size="sm" /> Cargando…</div>}

      <Row className="g-4">
        {cards.map((s, idx) => {
          const preview = s.image_url
            ? (s.image_url.startsWith('/') ? `http://localhost:5000${s.image_url}` : s.image_url)
            : null;
          return (
            <Col md={6} key={s.key}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">{s.key}</h5>
                    <Form.Check
                      type="switch"
                      id={`enabled-${s.key}`}
                      label="Visible"
                      checked={!!s.enabled}
                      onChange={(e) => setField(idx, 'enabled', e.target.checked)}
                    />
                  </div>

                  <Row className="g-2">
                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                          value={s.title || ''}
                          onChange={(e) => setField(idx, 'title', e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label>Subtítulo</Form.Label>
                        <Form.Control
                          value={s.subtitle || ''}
                          onChange={(e) => setField(idx, 'subtitle', e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group className="mb-2">
                        <Form.Label>Contenido (opcional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={s.content || ''}
                          onChange={(e) => setField(idx, 'content', e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Texto botón</Form.Label>
                        <Form.Control
                          value={s.cta_text || ''}
                          onChange={(e) => setField(idx, 'cta_text', e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Link botón</Form.Label>
                        <Form.Control
                          value={s.cta_link || ''}
                          onChange={(e) => setField(idx, 'cta_link', e.target.value)}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group className="mb-2">
                        <Form.Label>Orden</Form.Label>
                        <Form.Control
                          type="number"
                          value={s.order ?? 0}
                          onChange={(e) => setField(idx, 'order', Number(e.target.value))}
                        />
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group className="mb-2">
                        <Form.Label>Imagen (JPG/PNG/WEBP)</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setField(idx, '_file', e.target.files?.[0] || null)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {preview && (
                    <div className="ratio ratio-16x9 mb-2">
                      <img src={preview} alt={s.key} className="object-cover" />
                    </div>
                  )}

                  <div className="text-end">
                    <Button
                      className="btn-servicios"
                      disabled={savingKey === s.key}
                      onClick={() => handleSave(s)}
                    >
                      {savingKey === s.key ? 'Guardando…' : 'Guardar'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}





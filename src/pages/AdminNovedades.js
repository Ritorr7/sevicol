import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { uploadNewsImage, createNews, deleteNews, fetchNews, updateNews } from '../services/newsApi';

export default function AdminNovedades() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', coverUrl: '', content: '', published: true });

  const load = () => fetchNews({ limit: 100 }).then(r => setItems(r.items || []));
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ title:'', coverUrl:'', content:'', published:true }); setShow(true); };
  const openEdit = (n) => { setEditing(n); setForm({ title:n.title, coverUrl:n.coverUrl || '', content:n.content || '', published: !!n.published }); setShow(true); };

  const onSelectImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const { url } = await uploadNewsImage(file);
      setForm((f) => ({ ...f, coverUrl: url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    try {
      if (editing) await updateNews(editing.id, form);
      else await createNews(form);
      setShow(false);
      load();
    } catch (e) { alert(e.message); }
  };

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar novedad?')) return;
    try { await deleteNews(id); load(); } catch (e) { alert(e.message); }
  };

  return (
    <div className="section-wide py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="font-anton">Administrar Novedades</h2>
        <Button className="btn-servicios" onClick={openNew}>Nueva</Button>
      </div>

      <Table hover responsive>
        <thead><tr><th>Título</th><th>Publicado</th><th>Fecha</th><th></th></tr></thead>
        <tbody>
          {items.map(n => (
            <tr key={n.id}>
              <td>{n.title}</td>
              <td>{n.published ? 'Sí' : 'No'}</td>
              <td>{n.createdAt ? new Date(n.createdAt).toLocaleString() : '-'}</td>
              <td className="text-end">
                <Button size="sm" variant="outline-secondary" onClick={() => openEdit(n)}>Editar</Button>{' '}
                <Button size="sm" variant="outline-danger" onClick={() => remove(n.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar novedad' : 'Nueva novedad'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subir imagen (JPG/PNG/WEBP)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={onSelectImage} disabled={uploading} />
              {uploading && <div className="small text-muted mt-1">Subiendo imagen…</div>}
            </Form.Group>

            {form.coverUrl ? (
              <div className="mb-3">
                <div className="ratio ratio-16x9">
                  <img src={form.coverUrl} alt="cover" className="object-cover" />
                </div>
                <div className="small text-muted mt-1">{form.coverUrl}</div>
              </div>
            ) : null}

            <Form.Group className="mb-3">
              <Form.Label>Contenido (primer párrafo será el resumen)</Form.Label>
              <Form.Control as="textarea" rows={8} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
            </Form.Group>

            <Form.Check
              type="switch" id="published" label="Publicado"
              checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
          <Button className="btn-servicios" onClick={save}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}



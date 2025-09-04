import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { createCompany, listCompanies, updateCompany, deleteCompany } from '../services/clientsApi';

export default function AdminClientesEmpresas() {
  const [items, setItems] = useState([]);

  // Crear
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [stripeColor, setStripeColor] = useState('#ffffff'); // 👈 color elegido
  const [saving, setSaving] = useState(false);

  // Editar
  const [editing, setEditing] = useState(null); // {id, name, stripe_color}
  const [editFile, setEditFile] = useState(null);
  const [editColor, setEditColor] = useState(undefined); // undefined => no tocar

  const load = async () => setItems(await listCompanies());
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCompany({ name, file, stripe_color: stripeColor }); // 👈 enviar color
      setName(''); setFile(null);
      setStripeColor('#ffffff');
      await load();
    } catch (e) {
      alert('No se pudo guardar la empresa');
      console.error(e);
    } finally { setSaving(false); }
  };

  const saveEdit = async (id) => {
    try {
      await updateCompany(id, {
        name: editing.name,
        file: editFile,
        stripe_color: editColor, // puede ser '#xxxxxx', '' (borrar) o undefined (no tocar)
      });
      setEditing(null); setEditFile(null); setEditColor(undefined);
      await load();
    } catch (e) {
      alert('No se pudo actualizar');
      console.error(e);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar empresa y sus sucursales?')) return;
    try {
      await deleteCompany(id);
      await load();
    } catch (e) {
      alert('No se pudo eliminar');
      console.error(e);
    }
  };

  return (
    <div className="section-wide py-4">
      <h2 className="font-anton mb-3">Empresas (Clientes)</h2>

      {/* Alta */}
      <Form onSubmit={submit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Nombre de la empresa</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Color de franja (opcional)</Form.Label><br />
          <input type="color" value={stripeColor}
                 onChange={e => setStripeColor(e.target.value)}
                 style={{ width: 56, height: 36, cursor: 'pointer' }} />
          <Form.Text className="ms-2 text-muted">Si lo dejás por defecto, se estimará desde el logo.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Logo (JPG/PNG/WEBP)</Form.Label>
          <Form.Control type="file" accept="image/*"
                        onChange={e => setFile(e.target.files?.[0] || null)} />
        </Form.Group>

        <Button className="btn-servicios" type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Agregar empresa'}
        </Button>
      </Form>

      {/* Tabla */}
      <Table hover responsive>
        <thead>
          <tr><th style={{width:120}}>Logo</th><th>Nombre</th><th style={{width:260}}>Acciones</th></tr>
        </thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id}>
              <td>
                {c.logo_url
                  ? <img src={`http://localhost:5000${c.logo_url}`} alt={c.name}
                         style={{ maxWidth:110, maxHeight:60, objectFit:'contain' }} />
                  : '-'}
              </td>
              <td>
                {editing?.id === c.id ? (
                  <>
                    <Form.Control
                      value={editing.name}
                      onChange={e => setEditing({ ...editing, name: e.target.value })}
                      className="mb-2"
                    />
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <small>Franja:</small>
                      <input
                        type="color"
                        defaultValue={c.stripe_color || '#ffffff'}
                        onChange={(e) => setEditColor(e.target.value)}
                        style={{ width: 56, height: 28, cursor: 'pointer' }}
                      />
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => setEditColor('')} // '' => borrar color
                      >
                        Quitar color
                      </Button>
                    </div>
                    <Form.Control type="file" accept="image/*"
                                  onChange={e => setEditFile(e.target.files?.[0] || null)} />
                  </>
                ) : (
                  <>
                    <div className="fw-semibold">{c.name}</div>
                    {c.stripe_color && (
                      <div className="mt-1 d-inline-flex align-items-center gap-2">
                        <span className="badge bg-light text-dark">Franja</span>
                        <span style={{
                          display:'inline-block', width:20, height:12,
                          border:'1px solid #ddd', background:c.stripe_color
                        }} />
                        <small className="text-muted">{c.stripe_color}</small>
                      </div>
                    )}
                  </>
                )}
              </td>
              <td>
                {editing?.id === c.id ? (
                  <>
                    <Button size="sm" className="me-2" onClick={() => saveEdit(c.id)}>Guardar</Button>
                    <Button size="sm" variant="secondary" onClick={() => { setEditing(null); setEditFile(null); setEditColor(undefined); }}>Cancelar</Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" className="me-2"
                            onClick={() => setEditing({ id: c.id, name: c.name })}>
                      Editar
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => remove(c.id)}>Borrar</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}






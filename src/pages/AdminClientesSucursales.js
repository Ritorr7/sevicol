import React, { useEffect, useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { listCompanies, listBranches, createBranch, updateBranch, deleteBranch } from '../services/clientsApi';

export default function AdminClientesSucursales() {
  const [companies, setCompanies] = useState([]);
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ company_id: '', name: '', city: '', address: '' });
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null); // {id, company_id, name, city, address}

  const loadAll = async () => {
    const [cs, bs] = await Promise.all([listCompanies(), listBranches()]);
    setCompanies(cs);
    setRows(bs);
  };

  useEffect(() => {
    loadAll().catch(err => alert(err?.response?.data?.error || err.message));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      await createBranch(payload);
      setForm({ company_id: '', name: '', city: '', address: '' });
      // recargar desde servidor para tener id y company_name correctos
      const bs = await listBranches();
      setRows(bs);
    } catch (e) {
      alert('No se pudo guardar');
      console.error(e);
    } finally { setSaving(false); }
  };

  const saveEdit = async () => {
    try {
      await updateBranch(editing.id, editing);
      const bs = await listBranches();
      setRows(bs);
      setEditing(null);
    } catch (e) {
      alert('No se pudo actualizar');
      console.error(e);
    }
  };

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar sucursal?')) return;
    try {
      await deleteBranch(id);
      const bs = await listBranches();
      setRows(bs);
    } catch (e) {
      alert('No se pudo eliminar');
      console.error(e);
    }
  };

  return (
    <div className="section-wide py-4">
      <h2 className="font-anton mb-3">Sucursales</h2>

      <Form onSubmit={submit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Empresa</Form.Label>
          <Form.Select
            value={form.company_id}
            onChange={e => setForm(f => ({ ...f, company_id: e.target.value }))}
            required
          >
            <option value="">Seleccionar…</option>
            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Nombre de sucursal</Form.Label>
          <Form.Control value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Ciudad (opcional)</Form.Label>
          <Form.Control value={form.city}
                        onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección (opcional)</Form.Label>
          <Form.Control value={form.address}
                        onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
        </Form.Group>

        <Button className="btn-servicios" type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Agregar sucursal'}
        </Button>
      </Form>

      <Table size="sm" responsive>
        <thead>
          <tr><th>Empresa</th><th>Sucursal</th><th>Ciudad</th><th>Dirección</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const c = companies.find(x => String(x.id) === String(r.company_id));
            const isEdit = editing?.id === r.id;
            return (
              <tr key={r.id}>
                <td>{c?.name || r.company_name || r.company_id}</td>
                <td>{isEdit
                      ? <Form.Control size="sm" value={editing.name}
                                      onChange={e => setEditing({ ...editing, name: e.target.value })}/>
                      : r.name}</td>
                <td>{isEdit
                      ? <Form.Control size="sm" value={editing.city || ''}
                                      onChange={e => setEditing({ ...editing, city: e.target.value })}/>
                      : (r.city || '-')}</td>
                <td>{isEdit
                      ? <Form.Control size="sm" value={editing.address || ''}
                                      onChange={e => setEditing({ ...editing, address: e.target.value })}/>
                      : (r.address || '-')}</td>
                <td style={{width:220}}>
                  {isEdit ? (
                    <>
                      <Button size="sm" className="me-2" onClick={saveEdit}>Guardar</Button>
                      <Button size="sm" variant="secondary" onClick={() => setEditing(null)}>Cancelar</Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" className="me-2" onClick={() => setEditing({ ...r })}>Editar</Button>
                      <Button size="sm" variant="danger" onClick={() => remove(r.id)}>Borrar</Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}






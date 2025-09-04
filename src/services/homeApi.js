// src/services/homeApi.js
const BASE = 'http://localhost:5000/api/home';

const ok = async (r) => {
  if (!r.ok) {
    try { throw new Error((await r.json()).error || 'Error de red'); }
    catch { throw new Error('Error de red'); }
  }
  return r.json();
};

export const getHomeSections = () =>
  fetch(`${BASE}?_=${Date.now()}`, { cache: 'no-store' }).then(ok);

export const updateHomeSection = (key, data) =>
  fetch(`${BASE}/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(ok);

export const updateHomeSectionWithImage = async (key, fields = {}, file) => {
  const fd = new FormData();
  if (file) fd.append('image', file);
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v ?? ''));
  const r = await fetch(`${BASE}/${key}/image`, { method: 'PUT', body: fd });
  return ok(r);
};





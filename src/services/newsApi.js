const API = 'http://localhost:5000';
const BASE = `${API}/api/news`;

const okJson = async (r) => {
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const text = await r.text();
    throw new Error(`Respuesta no JSON (${r.status}). ${text.slice(0,160)}`);
  }
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Error de API');
  return data;
};

// listado (paginado)
// export const fetchNews = (params = {}) => {
//   const qs = new URLSearchParams(params).toString();
//   return fetch(`${BASE}?${qs}`).then(okJson);
// };

// últimas 3
export const fetchLatestNews = () =>
  fetch(`${BASE}/latest`).then(okJson);

// crear
export const createNews = (payload) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(okJson);

// actualizar
export const updateNews = (id, payload) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(okJson);

// eliminar
export const deleteNews = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(okJson);

// detalle por slug
// export const fetchNewsBySlug = (slug) =>
//   fetch(`${BASE}/slug/${slug}`).then(okJson);

// subida de imagen
export const uploadNewsImage = async (file) => {
  const fd = new FormData();
  fd.append('image', file);
  const r = await fetch(`${API}/api/uploads/news`, { method: 'POST', body: fd });
  const ct = r.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    const text = await r.text();
    throw new Error(`Respuesta no JSON (${r.status}). ${text.slice(0,160)}`);
  }
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || 'Error subiendo imagen');
  return data; // { url, filename, original }
};

// services/newsApi.js
const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000';

export async function fetchNews(params = {}) {
  const url = new URL(`${API_BASE}/api/news`);
  Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.append(k, v));
  const r = await fetch(url);
  if (!r.ok) throw new Error('Error cargando novedades');
  return r.json();
}

// NUEVO: obtener una novedad por slug
export async function fetchNewsBySlug(slug) {
  // Plan A: /api/news/slug/:slug
  let r = await fetch(`${API_BASE}/api/news/slug/${encodeURIComponent(slug)}`);
  if (r.ok) return r.json();

  // Plan B: /api/news?slug=xxx (devuelve lista; tomamos la primera)
  const url = new URL(`${API_BASE}/api/news`);
  url.searchParams.set('slug', slug);
  r = await fetch(url);
  if (!r.ok) throw new Error('Error cargando novedad');
  const data = await r.json();
  const items = data?.item || data?.items || data?.data || [];
  if (!items.length) throw new Error('Novedad no encontrada');
  return items[0];
}






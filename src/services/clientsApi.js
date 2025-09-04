import http from './http';

// Empresas
export const listCompanies = async () => {
  const { data } = await http.get('/clients/companies');
  return data;
};


export const createCompany = async ({ name, file, stripe_color }) => {
  const fd = new FormData();
  fd.append('name', name);
  if (file) fd.append('logo', file);
  if (stripe_color) fd.append('stripe_color', stripe_color); // 👈 enviar color

  const { data } = await http.post('/clients/companies', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const updateCompany = async (id, { name, file, stripe_color }) => {
  const fd = new FormData();
  if (name != null) fd.append('name', name);
  if (file) fd.append('logo', file);

  // Importante: permitir borrar el color si viene '', y no tocar si es undefined
  if (stripe_color !== undefined) {
    fd.append('stripe_color', stripe_color || '');
  }

  const { data } = await http.put(`/clients/companies/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const deleteCompany = async (id) => {
  const { data } = await http.delete(`/clients/companies/${id}`);
  return data;
};

// Sucursales
export const createBranch = async (payload) => {
  const { data } = await http.post('/clients/branches', payload);
  return data; // {ok, id}
};

export const updateBranch = async (id, payload) => {
  const { data } = await http.put(`/clients/branches/${id}`, payload);
  return data;
};

export const listBranches = async (companyId) => {
  const { data } = await http.get('/clients/branches', {
    params: companyId ? { company_id: companyId } : {},
  });
  return data; // [{id, company_id, company_name, name, city, address, ...}]
};

export const deleteBranch = async (id) => {
  const { data } = await http.delete(`/clients/branches/${id}`);
  return data;
};

// Página pública
export const fetchClientsGrouped = async () => {
  const { data } = await http.get('/clients/grouped');
  return data;
};




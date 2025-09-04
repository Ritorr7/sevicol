// frontend/src/services/usersApi.js
import http from './http';

export const listUsers   = () => http.get('/users').then(r => r.data);
export const createUser  = (payload) => http.post('/users', payload).then(r => r.data);
export const updateUser  = (id, payload) => http.put(`/users/${id}`, payload).then(r => r.data);
export const deleteUser  = (id) => http.delete(`/users/${id}`).then(r => r.data);

// Si querés usar el namespace /dev:
export const listUsersDev  = () => http.get('/dev/users').then(r => r.data);

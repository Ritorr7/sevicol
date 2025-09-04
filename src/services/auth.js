// src/services/auth.js
const AUTH_EVENT = 'auth:changed';

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user || null));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.dispatchEvent(new Event(AUTH_EVENT));
}

/* === helpers legacy para compatibilidad === */
export function isLoggedIn() {
  return !!getToken();
}

export function getRole() {
  return getUser()?.role ?? null;
}

export { AUTH_EVENT };


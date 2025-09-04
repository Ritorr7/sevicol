import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import FormularioCV from "./components/FormularioCV";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";
import ServiciosAdmin from "./components/ServiciosAdmin";
import Novedades from "./pages/Novedades";
import AdminNovedades from "./pages/AdminNovedades";
import AdminHome from "./pages/AdminHome";
import Clientes from "./pages/Clientes";
import AdminClientesEmpresas from "./pages/AdminClientesEmpresas";
import AdminClientesSucursales from "./pages/AdminClientesSucursales";
import PrivateRoute from './components/PrivateRoute';
import NavbarSevicol from "./components/NavbarSevicol";
import FooterSevicol from "./components/FooterSevicol";
import DevNavbar from "./components/DevNavbar";
import RequireAuth from './components/RequireAuth';
import QuienesSomos from "./pages/QuienesSomos";
import Certificaciones from "./pages/Certificaciones";
import Contacto from "./pages/Contacto.js";
import RecursosHumanos from "./pages/RecursosHumanos.js";
import NoticiaDetalle from './pages/NoticiaDetalle';
export default function App() {
  const { pathname } = useLocation();
  const isBackoffice = pathname.startsWith("/admin") || pathname.startsWith("/dev");

  return (
    <>
      {isBackoffice ? <DevNavbar /> : <NavbarSevicol />}

      <Routes>
        {/* público */}
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/certificaciones" element={<Certificaciones />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/recursos" element={<RecursosHumanos />} />
        <Route path="/formularioCV" element={<FormularioCV />} />
        {/* detalle por slug */}
        <Route path="/novedades/:slug" element={<NoticiaDetalle />} />


-       {/* Backoffice / Dev */}
-       <Route path="/dev" element={<AdminPanel />} />
-       <Route path="/admin" element={<AdminPanel />} />
-       <Route path="/admin/home" element={<AdminHome />} />
-       <Route path="/admin/clientes/empresas" element={<AdminClientesEmpresas />} />
-       <Route path="/admin/clientes/sucursales" element={<AdminClientesSucursales />} />
-       <Route path="/admin/servicios/nuevo" element={<ServiciosAdmin />} />
-       <Route path="/admin/novedades" element={<AdminNovedades />} />
-       <Route path="/formulario" element={<PrivateRoute roles={['admin','viewer']}><FormularioCV /></PrivateRoute>}/>
+       {/* Backoffice / Dev protegidos */}
+       <Route element={<RequireAuth roles={['dev']} />}>
+         <Route path="/dev" element={<AdminPanel />} />
+         <Route path="/admin" element={<AdminPanel />} />
+         <Route path="/admin/home" element={<AdminHome />} />
+         <Route path="/admin/clientes/empresas" element={<AdminClientesEmpresas />} />
+         <Route path="/admin/clientes/sucursales" element={<AdminClientesSucursales />} />
+         <Route path="/admin/servicios/nuevo" element={<ServiciosAdmin />} />
+         <Route path="/admin/novedades" element={<AdminNovedades />} />
+       </Route>
+
+       {/* ejemplo de otra ruta protegida por rol */}
+       <Route element={<RequireAuth roles={['admin','viewer']} />}>
+         <Route path="/admin" element={<AdminPanel/>} />
+       </Route>
      </Routes>

      {!isBackoffice && <FooterSevicol />}
    </>
  );
}



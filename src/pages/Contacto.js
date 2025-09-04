import React, { useState } from "react";
import Hero from "../components/Hero";
import "./Contacto.css";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    ciudad: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo enviar el mensaje.");
      }

      setSent(true);
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        direccion: "",
        ciudad: "",
        mensaje: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Hero
        subtitle="CONTÁCTANOS"
        title="Estamos para ayudarte"
        description="Escribenos o llamanos. Nuestro equipo está disponible para asesorarte y brindarte una solución a medida."
        variant="dark"
        align="center"
        height="sm"
      />

      <main className="contacto-page">
        <section className="contacto-grid">
          <aside className="contacto-info card-like">
            <h3 className="contacto-heading">Información de contacto</h3>
            <ul className="contacto-list">
              <li>
                <i className="bi bi-telephone-outbound"></i>
                <div>
                  <span className="label">Teléfono</span>
                  <a href="tel:+59845523923">4552 3923</a>
                </div>
              </li>
              <li>
                <i className="bi bi-envelope-fill"></i>
                <div>
                  <span className="label">Email</span>
                  <a href="mailto:contacto@sevicol.com.uy">contacto@sevicol.com.uy</a>
                </div>
              </li>
              <li>
                <i className="bi bi-geo-alt-fill"></i>
                <div>
                  <span className="label">Dirección</span>
                  <span>Bvar. José Enrique Rodó 156, Rosario, Uruguay</span>
                </div>
              </li>
              <li>
                <i className="bi bi-clock-fill"></i>
                <div>
                  <span className="label">Horarios</span>
                  <span>Lun a Vie: 8:00–17:00 · Sáb: 8:00–12:00</span>
                </div>
              </li>
            </ul>
          </aside>

          <section className="contacto-form card-like">
            <h3 className="contacto-heading">Envíanos un mensaje</h3>

            {!sent ? (
              <form onSubmit={onSubmit} className="form" noValidate>
                <div className="form-row">
                  <div className="field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={onChange}
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="tu@mail.com"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={onChange}
                      placeholder="Número"
                    />
                  </div>
                  <div className="field">
                    <label>Empresa</label>
                    <input
                      type="text"
                      name="empresa"
                      value={form.empresa}
                      onChange={onChange}
                      placeholder="Nombre de Empresa"
                    />
                  </div>
                  <div className="field">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={form.direccion}
                      onChange={onChange}
                      placeholder="Calle y número"
                    />
                  </div>
                  <div className="field">
                    <label>Ciudad</label>
                    <input
                      type="text"
                      name="ciudad"
                      value={form.ciudad}
                      onChange={onChange}
                      placeholder="Nombre de Ciudad"
                    />
                  </div>
                </div>

                <div className="field">
                  <label>Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows={6}
                    value={form.mensaje}
                    onChange={onChange}
                    required
                    placeholder="Contanos brevemente en qué podemos ayudarte"
                  />
                </div>

                {error && <p style={{color:"#d32f2f", marginTop:4}}>{error}</p>}

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar consulta"}
                </button>
              </form>
            ) : (
              <div className="sent-ok">
                <i className="bi bi-check2-circle"></i>
                <p>
                  ¡Gracias! Recibimos tu mensaje y nos pondremos en contacto a la
                  brevedad.
                </p>
              </div>
            )}
          </section>
        </section>

        <section className="contacto-mapa">
          <div className="card-like">
            <h3 className="contacto-heading">Cómo llegar</h3>
            <div className="mapa-embed">
              <iframe
                title="Mapa Sevicol"
                src="https://www.google.com/maps?q=Bvar.+Jos%C3%A9+Enrique+Rod%C3%B3+156,+Rosario,+Uruguay&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


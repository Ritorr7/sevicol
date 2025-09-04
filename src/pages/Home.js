import React, { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchLatestNews } from '../services/newsApi';
import './Home.css';

// Catálogo de servicios
const SERVICES = [
  { key: 'electronica', label: 'Seguridad electrónica', icon: 'bi-hdd-network',
    items: ['Sistema de Detección de Intrusos','Monitoreo de Alarmas','Sistema de CCTV','Sistema de Detección de Incendios','Control de Acceso','GPS para flota vehicular'] },
  { key: 'fisica', label: 'Seguridad física', icon: 'bi-shield-shaded',
    items: ['Portería y Vigilancia','Vigilancia con porte de armas','Custodia de Valores','Custodia Personal (Guardespaldas)','Custodia de Mercaderías y Cargas en Ruta'] },
  { key: 'bomberos', label: 'Habilitaciones de bomberos', icon: 'bi-fire',
    items: ['Habilitación llave en mano','Proyecto','Tramitación','Venta e instalación de insumos','Detección','Señalización y combate al fuego'] },
  { key: 'monitoreo', label: 'Monitoreo y respuesta', icon: 'bi-broadcast-pin',
    items: ['Controles físicos y electrónicos','Central de operaciones propias'] },
  { key: 'limpieza', label: 'Limpieza integral', icon: 'bi-bucket',
    items: ['Limpieza Domiciliaria','Limpieza Industrial','Limpieza Sanatorial y Hospitalaria'] },
  { key: 'capacitacion', label: 'Centro de capacitación', icon: 'bi-mortarboard',
    items: ['Cursos de capacitación','Cursos de idoneidad para THATA','Cursos de idoneidad para porte de armas'] },
];

const Home = () => {
  // Permite abrir varios servicios a la vez
  const [openKeys, setOpenKeys] = useState(new Set());
  const [latest, setLatest] = useState([]);

useEffect(() => { fetchLatestNews().then(setLatest).catch(console.error); }, []);

  const toggle = (key) => {
    setOpenKeys(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <>
      
      {/* CARRUSEL HEADER */}
      <div id="sevicolCarousel" className="carousel slide carousel-fade carrusel-header" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active" data-bs-interval="5000">
            <img src="/assets/home/frente_sevicol2.webp" className="d-block w-100 img-difusa" alt="Fondo 1" />
            <div className="header-overlay d-flex flex-column justify-content-center align-items-center text-center">
              <h1 className="display-4 font-anton titulo-naranja fade-in delay-1">Bienvenido a Sevicol</h1>
              <p className="text-light fs-5 fade-in delay-2">Seguridad, limpieza y tecnología a su servicio</p>
              <Button href="/contacto" variant="light" className="btn-custom mt-3 fade-in delay-3">Contáctanos</Button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item" data-bs-interval="5000">
            <img src="/assets/home/header2.webp" className="d-block w-100 img-difusa" alt="Fondo 2" />
            <div className="header-overlay d-flex flex-column justify-content-center align-items-center text-center">
              <h1 className="display-4 font-anton titulo-naranja fade-in delay-1">Protegemos lo que más importa</h1>
              <p className="text-light fs-5 fade-in delay-2">Sistemas integrales para hogares y empresas</p>
              <Button href="/servicios" variant="light" className="btn-custom mt-3 fade-in delay-3">Ver Servicios</Button>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item" data-bs-interval="5000">
            <img src="/assets/home/vigilancia.webp" className="d-block w-100 img-difusa" alt="Fondo 3" />
            <div className="header-overlay d-flex flex-column justify-content-center align-items-center text-center">
              <h1 className="display-4 font-anton titulo-naranja fade-in delay-1">Confianza y compromiso</h1>
              <p className="text-light fs-5 fade-in delay-2">Más de 25 años brindando soluciones reales</p>
              <Button href="/quienes-somos" variant="light" className="btn-custom mt-3 fade-in delay-3">Conocenos</Button>
            </div>
          </div>
        </div>

        {/* Controles */}
        <button className="carousel-control-prev" type="button" data-bs-target="#sevicolCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#sevicolCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* SERVICIOS */}
      <section id="servicios" className="py-5 bg-white w-100">
        <div className="section-wide">
          <h2 className="text-center mb-5 text-dark font-anton">Nuestros Servicios</h2>

          {/* Cinta / Marquee (duplicamos el array para el loop) */}
          <div className="services-marquee">
            <div className="services-track">
              {[...SERVICES, ...SERVICES].map((s, i) => {
                const isOpen = openKeys.has(s.key);
                return (
                  <div
                    className={`service-item ${isOpen ? 'is-open' : ''}`}
                    key={`srv-${i}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggle(s.key)}
                    onKeyDown={(e) => e.key === 'Enter' && toggle(s.key)}
                    title="Ver detalle"
                  >
                    <div className="service-head">
                      <i className={`bi ${s.icon} service-icon`} aria-hidden="true"></i>
                      <span className="service-title">{s.label}</span>
                      <span className={`caret ${isOpen ? 'open' : ''}`} aria-hidden>▾</span>
                    </div>

                    <ul className={`service-sub ${isOpen ? 'open' : ''}`}>
                      {s.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="todos-servicios-container">
            <a href="/servicios" className="btn-todos-servicios">
              Todos Nuestros Servicios
            </a>
          </div>
        </div>
      </section>

      {/* Ultimas tres Novedades */}
      <section id="novedades" className="py-5 bg-degrade-sevicol-img w-100">
        <div className="section-wide">
          <h2 className="text-center mb-4 font-anton">Ultimas Novedades</h2>

          <div className="row g-4 justify-content-center">
            {latest.map((n) => {
              // 1) normalizar resumen (primer párrafo)
              const resumen =
                (n.contenido || n.content || '')
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean)[0] || n.resumen || '';

              // 2) normalizar cover url (acepta cover_url o coverUrl)
              let cover = n.cover_url || n.coverUrl || '';
              if (cover && cover.startsWith('/')) {
                cover = `http://localhost:5000${cover}`;
              }
              if (!cover) cover = '/assets/news/placeholder.jpg';

              return (
                <div className="col-auto" key={n.id}>
                  <div className="card h-100 shadow-sm news-card">
                    <div className="ratio ratio-16x9">
                      <img src={cover} alt={n.titulo || n.title} className="object-cover" />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{n.titulo || n.title}</h5>
                      <p className="card-text text-muted flex-grow-1">{resumen}</p>
                      <div className="text-center mt-2">
                        <a href={`/novedades/${n.slug}`} className="btn-novedades">
                          Más información
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {latest.length === 0 && <p className="text-center">No hay novedades aún.</p>}
          </div>

          <div className="text-center mt-4">
            <a href="/novedades" className="btn-novedades">Ver todas las noticias</a>
          </div>
        </div>
      </section>

      {/* TRABAJA CON NOSOTROS */}
      {/* <section id="trabaja" className="py-5 bg-white w-100">
        <div className="section-wide">
          <h2 className="text-center mb-4 font-anton">Trabaja con nosotros</h2>
          <p className="text-center">
            Buscamos personas responsables, comprometidas y capacitadas para unirse a nuestro equipo. Completá el formulario de ingreso en la sección correspondiente.
          </p>
          <div className="text-center">
            <Button href="/formulario" variant="warning" className="btn-custom">Enviar CV</Button>
          </div>
        </div>
      </section> */}

      {/* FRASE CORPORATIVA */}
      <section id="frase-sevicol" className="frase-sevicol text-center text-light">
        <div className="section-wide">
          <img src="/assets/sevicol_logo4.png" alt="Sevicol" className="mb-3 frase-logo" />
          <div><br/></div>
          <div><br/></div>
          <div><br/></div>
          <div><br/></div>
          <div><br/></div>
          <div className="frase-panel">            
            <h2 className="frase-text frase-formal">
              LA SEGURIDAD SE LOGRA CON CONFIANZA,
              Y LA CONFIANZA SE GANA CON<br />
              HONESTIDAD Y RESPONSABILIDAD.
            </h2>
          </div>

          <div className="todos-servicios-container">
            <a href="/contacto" className="btn-todos-servicios">Contáctanos!</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;





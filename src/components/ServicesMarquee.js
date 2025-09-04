// frontend/src/components/ServicesMarquee.jsx
import React from 'react';

const SERVICES = [
  { icon: 'bi-camera-video-fill',   label: 'Cámaras de Seguridad' },
  { icon: 'bi-bell-fill',           label: 'Alarmas' },
  { icon: 'bi-fire',                label: 'Venta y recarga de extintores' },
  { icon: 'bi-bucket-fill',         label: 'Servicios de Limpieza' },
  { icon: 'bi-door-closed-fill',    label: 'Control de Acceso' },
  { icon: 'bi-lightning-charge',    label: 'Cercos Eléctricos' },
  { icon: 'bi-clock-history',       label: 'Monitoreo 24/7' },
  { icon: 'bi-router-fill',         label: 'Videovigilancia IP' },
  { icon: 'bi-diagram-3-fill',      label: 'Cableado Estructurado' },
  { icon: 'bi-door-open-fill',      label: 'Automatización de portones' },
  { icon: 'bi-geo-fill',            label: 'GPS y Rastreo' },
  { icon: 'bi-tools',               label: 'Soporte Técnico' },
];

const ServicesMarquee = () => {
  // Duplicamos la lista para un loop perfecto
  const loopItems = [...SERVICES, ...SERVICES];

  return (
    <section id="servicios" className="py-5 bg-white w-100">
      <div className="section-wide px-0">
        <h2 className="text-center mb-5 text-dark font-anton">Nuestros Servicios</h2>

        <div className="services-marquee" aria-label="Lista de servicios en movimiento">
          <div className="services-track">
            {loopItems.map((s, idx) => (
              <div className="service-item" key={`${s.label}-${idx}`}>
                <i className={`bi ${s.icon} service-icon`} aria-hidden="true"></i>
                <div className="service-text">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <a href="/servicios" className="btn btn-servicios">Todos Nuestros Servicios</a>
        </div>
      </div>
    </section>
  );
};

export default ServicesMarquee;


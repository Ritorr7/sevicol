import React from "react";
import "./QuienesSomos.css";
import Hero from "../components/Hero";

function SplitSection({ img, alt, reverse=false, kicker="", title, lead, body }) {
  return (
    <section className={`qs-section ${reverse ? "is-reverse" : ""}`}>
      <figure className="qs-photo">
        <img src={img} alt={alt} loading="lazy" />
      </figure>

      <div className="qs-copy">
        {kicker && <p className="qs-kicker">{kicker}</p>}
        <h2 className="qs-title">{title}</h2>
        {lead && <p className="qs-lead">{lead}</p>}
        {body && <p className="qs-body">{body}</p>}
      </div>
    </section>
  );
}
function SplitSection2({ img, alt, reverse=false, kicker="", title, lead, body }) {
  return (
    <section className={`qs-section ${reverse ? "is-reverse" : ""}`}>
      <figure className="qs-photo">
        <img src={img} alt={alt} loading="lazy" />
      </figure>

      <div className="qs-copy">
        {kicker && <p className="qs-kicker">{kicker}</p>}
        <h2 className="qs-title">{title}</h2>
        {lead && <p className="qs-lead">{lead}</p>}
        {body && <p className="qs-body">{body}</p>}
        <div style={{ marginTop: "1.5rem" }}>
        <a href="/certificaciones" className="btn btn-primary">
          Certificaciones
        </a>
      </div>
      </div>
    </section>
  );
}

export default function QuienesSomos() {
  return (
    <>
        <Hero
        subtitle="QUIÉNES SOMOS"
        title="Confianza, foco y resultados"
        description="Más de 25 años brindando soluciones integrales de seguridad, limpieza y tecnología en todo el país."
        variant="dark" 
        align="center"
        height="sm"
      />
    <main className="qs-page">
      {/* HISTORIA (imagen izquierda) */}
      <SplitSection
        img="/assets/home/equipo_sevicol.webp"
        alt="Frente de Sevicol"
        kicker="Nuestra"
        title="Historia"
        lead="La seguridad se logra con confianza, y la confianza se gana con honestidad y responsabilidad."
        body="Días antes del inicio del nuevo siglo comenzamos a caminar en pos de la
              consolidación de una empresa capaz de instrumentar soluciones integrales en seguridad."
      />

      {/* ORGULLO Y CRECIMIENTO (imagen derecha) */}
      <SplitSection
        img="/assets/home/oficina_sevicol.webp"
        alt="Oficina de Sevicol"
        reverse
        title="Orgullo y crecimiento"
        lead="Hoy sentimos el orgullo de haber superado aquellos objetivos."
        body="Lo hicimos respetando cabalmente nuestro marco regulatorio, convirtiéndonos
              en la empresa de seguridad privada de capitales nacionales más importante, ganando la confianza
              de las principales compañías del país."
      />

      {/* COMPROMISO (imagen izquierda) */}
      <SplitSection
        img="/assets/home/vigilancia.webp"
        alt="Vigilancia y monitoreo"
        title="Compromiso permanente"
        lead="Planificación, seguimiento y supervisión de los servicios."
        body="Nuestra meta es mantener y mejorar procesos para asegurar la satisfacción de nuestros clientes,
              ampliando el alcance a todo el territorio nacional."
      />

            {/* Política de Gestion (imagen derecha) */}
      <SplitSection2
        img="/assets/home/certificado.jpg"
        alt="Certificados"
        reverse
        title="Política de Gestion"
        lead="Brindamos confianza y seguridad al cliente y todas las partes interesadas,
              satisfaciendo sus necesidades y expectativas."
        body="Ofrecemos a nuestro equipo estabilidad laboral, capacitación continua,
              buen ambiente de trabajo con apertura para consultas, participación, y
              posibilidades de desarrollo profesional y personal.
              Nos comprometemos a proporcionar condiciones de trabajo seguras y
              saludables para la prevención de lesiones y deterioro de la salud
              relacionados con el trabajo, eliminando peligros y reduciendo riesgos.
              Buscamos calidad y rendimiento en los productos y servicios que
              compramos a nuestros proveedores.
              Nos posicionamos en el mercado, consolidando clientes, avanzando de
              forma planificada y logrando optimizar la rentabilidad.
              Cumplimos con todos los requisitos legales y reglamentarios de la empresa
              y mejoramos continuamente la eficacia de nuestro sistema de gestión."
      />    
      {/* MISIÓN / VISIÓN / VALORES */}
      <section className="qs-mvv">
        <div className="qs-mvv-grid">
          <article className="qs-card dark">
            <i className="bi bi-bullseye"></i>
            <h3>Misión</h3>
            <p>Atender las necesidades actuales de seguridad personal y patrimonial
              teniendo como plataforma el compromiso social, la ética y la permanencia,
              garantizando la protección y tranquilidad de nuestros clientes.</p>
          </article>

          <article className="qs-card orange">
            <i className="bi bi-compass"></i>
            <h3>Visión</h3>
            <p>Crecer y expandir nuestro radio de acción en todo el país, manteniendo y mejorando procesos
               para asegurar la satisfacción continua.</p>
          </article>

          <article className="qs-card light">
            <i className="bi bi-shield-check"></i>
            <h3>Valores</h3>
            <p>Honestidad · Eficacia · Vocación de servicio · Responsabilidad.</p>
          </article>
        </div>
      </section>
    </main>
    </>
  );
}





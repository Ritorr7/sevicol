import React from "react";
import Hero from "../components/Hero";
import "./RecursosHumanos.css";

export default function RecursosHumanos() {
  return (
    <>
      {/* <Hero
        subtitle="RECURSOS HUMANOS"
        title="Personas comprometidas, resultados sobresalientes"
        description="Buscamos talento responsable y con vocación de servicio. Capacitación continua, respeto y oportunidades reales de crecimiento."
        variant="dark"
        align="center"
        height="sm"
      /> */}
      <Hero
        subtitle="RECURSOS HUMANOS"
        title="Nuestro equipo, nuestra fortaleza"
        description="Capacitación, desarrollo y bienestar para asegurar la calidad del servicio."
        variant="dark"
        align="center"
        height="sm"       
      />

      <main className="rh-page">
        {/* Intro + Foto */}
        <section className="rh-intro">
          <div className="rh-intro-grid">
            <div className="rh-intro-copy">
              <h2 className="rh-title">Para brindar seguridad primero debemos estar seguros de quienes nos representan.</h2>
              <p className="rh-lead">
                Es por ello que la selección de los recursos humanos la realizamos
                a través de un minucioso proceso interno, de manera de garantizar la 
                capacidad técnica, las habilidades psicosociales y las condiciones humanas 
                de los funcionarios, para que estos honren y representen los valores de la 
                empresa, manteniendo siempre una buena presencia, cortesía y un alto nivel de comunicación.                 
              </p>
              <p className="rh-lead">
                <strong>Nuestro centro de capacitación de guardia privada está debidamente 
                    habilitado por el Ministerio del Interior. En él se instruye al personal 
                    para que la tecnología, puesta al servicio de la seguridad, sea realmente 
                    eficaz en cada operativo, gracias a las adecuadas intervenciones de un 
                    personal debidamente instruido.</strong>                  
              </p>
            </div>
          </div>
        </section>
        <section className="rh-intro">
          <div className="rh-intro-grid">
            <figure className="rh-intro-photo">
              <img
                src="/assets/home/oficina_sevicol.webp"
                alt="Equipo trabajando en SEVICOL"
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* Áreas y cursos */}
        {/* <section className="rh-grid">
          <article className="rh-card">
            <i className="bi bi-people-fill rh-card-icon" />
            <h3>Selección y evaluación</h3>
            <p>
              Procesos transparentes y profesionales: análisis de perfil, entrevistas,
              verificación de antecedentes y evaluación de competencias.
            </p>
          </article>

          <article className="rh-card">
            <i className="bi bi-mortarboard-fill rh-card-icon" />
            <h3>Capacitación continua</h3>
            <p>
              Planes de formación en seguridad, atención al cliente, primeros auxilios,
              protocolos y uso responsable de la tecnología.
            </p>
          </article>

          <article className="rh-card">
            <i className="bi bi-shield-check rh-card-icon" />
            <h3>Idoneidades y habilitaciones</h3>
            <p>
              Acompañamos tramitación y cursos de idoneidad <strong>THATA</strong> y
              para <strong>porte de armas</strong>, cumpliendo los requisitos vigentes.
            </p>
          </article>

          <article className="rh-card">
            <i className="bi bi-diagram-3 rh-card-icon" />
            <h3>Plan de carrera</h3>
            <p>
              Oportunidades de crecimiento y reconocimiento: supervisión, coordinación,
              operaciones y capacitación interna.
            </p>
          </article>
        </section> */}

        {/* Proceso de ingreso */}
        {/* <section className="rh-steps">
          <h2 className="rh-title center">Proceso de ingreso</h2>
          <div className="rh-steps-row">
            <div className="rh-step">
              <span className="rh-step-num">1</span>
              <h4>Postulación</h4>
              <p>Completá el formulario y adjuntá tu CV con experiencia y disponibilidad.</p>
            </div>
            <div className="rh-step">
              <span className="rh-step-num">2</span>
              <h4>Entrevista</h4>
              <p>Evaluación de competencias, referencias y pruebas específicas si aplica.</p>
            </div>
            <div className="rh-step">
              <span className="rh-step-num">3</span>
              <h4>Capacitación</h4>
              <p>Inducción, normas, protocolos y entrenamiento práctico.</p>
            </div>
            <div className="rh-step">
              <span className="rh-step-num">4</span>
              <h4>Asignación</h4>
              <p>Ingreso al puesto con seguimiento y soporte del equipo.</p>
            </div>
          </div>
        </section> */}

         {/* CTA final */}
        <section className="rh-cta">
          <div className="rh-cta-box">
            <h3>¿Te gustaría formar parte de SEVICOL?</h3>
            <p>Completá tu postulación y nos pondremos en contacto.</p>
            <a className="btn-rh primary" href="/formularioCV">
              <i className="bi bi-file-earmark-arrow-up" /> Enviar CV
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

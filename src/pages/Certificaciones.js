import React from "react";
import Hero from "../components/Hero";
import "./Certificaciones.css";

export default function Certificaciones() {
  return (
    <>
      <Hero
        subtitle="CERTIFICACIONES"
        title="Calidad y compromiso garantizados"
        description="Nuestros procesos cumplen con los más altos estándares internacionales."
        variant="dark"
        align="center"
        height="sm"
      />

      <main className="certificaciones-page">
        <div className="certificaciones-grid">
          <img src="/assets/home/certificado1.jpg" alt="Certificado ISO 9001" />
          <img src="/assets/home/certificado2.jpg" alt="Certificado ISO 45001" />
        </div>
      </main>
    </>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { fetchClientsGrouped } from '../services/clientsApi';
import ColorThief from 'colorthief';
import './Clientes.css';
import './Home.css';
import Hero from '../components/Hero';

export default function Clientes() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchClientsGrouped().then(setGroups).catch(console.error);
  }, []);

  return (
    <>
    {/* <Hero
      subtitle="NUESTROS CLIENTES"
      title="Confianza que se construye día a día"
      description="Más de 25 años junto a empresas líderes en todo el país."
      bgImage="/assets/home/frente_sevicol2.webp"
      overlayStrength={0.55}
      align="center"
      height="lg"
    /> */}

    <Hero
      subtitle="NUESTROS CLIENTES"
      title="Confianza que se construye día a día"
      description="Relaciones sólidas con empresas y personas que protegen lo que más valoran."
      variant="dark"
      align="center"
      height="sm"
    />    
    <div className="clients-page">
      <Container className="py-5">
        <div className="clients-grid">
          {groups.map((g) => (
            <ClientCard key={g.id} client={g} />
          ))}
        </div>
      </Container>
    </div>
    </>
  );
}

function ClientCard({ client }) {
  const [stripColor, setStripColor] = useState(client.stripe_color || '#f4f4f4');
  const imgRef = useRef(null);

  const handleImgLoad = () => {
    if (client.stripe_color) return; // si viene de DB, respetamos y no calculamos
    try {
      const ct = new ColorThief();
      const [r, g, b] = ct.getColor(imgRef.current);
      setStripColor(`rgb(${r}, ${g}, ${b})`);
    } catch (err) {
      console.warn('ColorThief:', err.message);
    }
  };

  return (
    <article className="client-card">
      <div className="client-logo-strip" style={{ backgroundColor: stripColor }}>
        {client.logo_url ? (
          <img
            ref={imgRef}
            crossOrigin="anonymous"
            src={`http://localhost:5000${client.logo_url}`}
            alt={client.name}
            className="client-logo-strip-img"
            onLoad={handleImgLoad}
          />
        ) : (
          <div className="client-logo-strip-placeholder">
            {client.name?.[0] || '?'}
          </div>
        )}
      </div>

      <h3 className="client-title text-center">{client.name}</h3>
      <hr className="client-sep" />
      <ul className="client-branches">
        {client.branches.map(b => (
          <li key={b.id} className="branch-item">
            <i className="bi bi-geo-alt-fill branch-icon" />
            <span className="branch-name">{b.name}</span>
            {b.city && (<><span className="branch-dot">·</span><span className="branch-city">{b.city}</span></>)}
          </li>
        ))}
        {client.branches.length === 0 && <li className="muted">Sin sucursales cargadas.</li>}
      </ul>
    </article>
  );
}






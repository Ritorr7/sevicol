import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/newsApi';
import './Home.css';
import Hero from '../components/Hero';

export default function Novedades() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, limit: 12 });

  useEffect(() => {
    fetchNews({ published: true, limit: 12, page: 1 })
      .then(setData)
      .catch(console.error);
  }, []);

  // Soporta ambas formas de respuesta: { items: [...] } o { data: [...] }
  const items = data.items || data.data || [];

  return (
    <>
      <Hero
        subtitle="NOVEDADES"
        title="Siempre un paso adelante"
        description="Noticias, proyectos y avances que fortalecen nuestro compromiso con la comunidad."
        variant="dark"
        align="center"
        height="sm"
      />
    <div className="py-5">
      <div className="section-wide">
        <div className="row g-4 justify-content-center">
          {items.map((n) => {
            const title = n.titulo || n.title || '';
            const resumen =
              n.resumen ||
              ((n.contenido || n.content || '')
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)[0] || '');

            // Normalizar cover (acepta cover_url o coverUrl) y host del backend
            let cover = n.cover_url || n.coverUrl || '';
            if (cover && cover.startsWith('/')) {
              cover = `http://localhost:5000${cover}`;
            }
            if (!cover) cover = '/assets/news/placeholder.jpg';

            return (
              <div className="col-auto" key={n.id}>
                <div className="card h-100 news-card">
                  <div className="ratio ratio-16x9">
                    <img
                      src={cover}
                      alt={title}
                      className="card-img-top object-cover"
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted flex-grow-1">{resumen}</p>
                    <a href={`/novedades/${n.slug}`} className="btn btn-servicios mt-2">
                      Leer
                    </a>
                  </div>
                </div>
              </div>
            );
          })}

          {items.length === 0 && <p>No hay novedades publicadas.</p>}
        </div>
      </div>
    </div>
    </>
  );
}




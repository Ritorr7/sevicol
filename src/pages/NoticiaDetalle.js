// src/pages/NoticiaDetalle.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { fetchNewsBySlug } from '../services/newsApi';
import './NoticiaDetalle.css';

const API_BASE = process.env.REACT_APP_API || 'http://localhost:5000';

export default function NoticiaDetalle() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ok' | 'error'

  useEffect(() => {
    let alive = true;
    setStatus('loading');
    fetchNewsBySlug(slug)
      .then((data) => {
        if (!alive) return;
        setItem(data);
        setStatus('ok');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => alive && setStatus('error'));
    return () => { alive = false; };
  }, [slug]);

  const norm = useMemo(() => {
    if (!item) return {};
    const title = item.titulo || item.title || '';
    const subtitle = item.subtitulo || item.subtitle || '';
    const content = item.contenido || item.content || '';
    const fecha = item.fecha || item.created_at || item.createdAt || null;
    const author = item.autor || item.author || '';
    let cover = item.cover_url || item.coverUrl || '';
    if (cover && cover.startsWith('/')) cover = `${API_BASE}${cover}`;
    return { title, subtitle, content, fecha, author, cover };
  }, [item]);

  return (
    <>
      <Hero
        subtitle="NOVEDADES"
        title={norm.title || 'Detalle de novedad'}
        description={norm.subtitle || ' '}
        variant="dark"
        align="center"
        height="sm"
      />

      <main className="news-article">
        {status === 'loading' && (
          <div className="news-loading">Cargando novedad…</div>
        )}

        {status === 'error' && (
          <div className="news-error">
            No pudimos cargar la novedad. <Link to="/novedades">Volver</Link>
          </div>
        )}

        {status === 'ok' && (
          <article className="news-container">
            {/* Cover */}
            {norm.cover && (
              <figure className="news-cover">
                <img src={norm.cover} alt={norm.title} loading="eager" />
              </figure>
            )}

            {/* Meta */}
            <header className="news-header">
              {norm.fecha && (
                <time className="news-date">
                  {new Date(norm.fecha).toLocaleDateString('es-UY', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </time>
              )}
              {norm.author && <span className="news-author"> · {norm.author}</span>}
            </header>

            {/* Contenido */}
            <section className="news-body">
              {looksLikeHTML(norm.content)
                ? <div dangerouslySetInnerHTML={{ __html: norm.content }} />
                : norm.content.split('\n').map((p, i) =>
                    p.trim() ? <p key={i}>{p.trim()}</p> : <br key={i} />
                  )
              }
            </section>

            <footer className="news-footer">
              <Link to="/novedades" className="btn btn-servicios">← Volver a Novedades</Link>
            </footer>
          </article>
        )}
      </main>
    </>
  );
}

// detección simple: si parece HTML, lo renderizamos como tal
function looksLikeHTML(str = '') {
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

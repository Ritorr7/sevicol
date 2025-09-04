// components/Hero.jsx
import React from "react";
import "./Hero.css";

/**
 * Hero reutilizable
 *
 * Props:
 * - subtitle (string)   -> Kicker arriba del título (ej: "QUIÉNES SOMOS")
 * - title (string)      -> Título grande
 * - description (string)-> Frase / bajada
 * - align ('center'|'left')             -> Alineación del contenido (default 'center')
 * - variant ('dark'|'orange'|'light')   -> Paleta base (default 'dark')
 * - height ('sm'|'md'|'lg')             -> Alto del hero (default 'md')
 * - bgImage (string)    -> Imagen de fondo (opcional). Si viene, se aplica overlay.
 * - overlayStrength (0..1) -> Opacidad del overlay sobre la imagen (default 0.55)
 * - actions ([{label, href, variant:'primary'|'ghost'}])
 */
export default function Hero({
  subtitle = "",
  title = "",
  description = "",
  align = "center",
  variant = "dark",
  height = "md",
  bgImage,
  overlayStrength = 0.55,
  actions = []
}) {
  const hasImage = Boolean(bgImage);

  // CSS custom props para pasar la imagen/overlay
  const styleVars = hasImage
    ? {
        "--hero-bg-image": `url("${bgImage}")`,
        "--hero-overlay": overlayStrength
      }
    : {};

  return (
    <section
      className={[
        "hero",
        `hero--${variant}`,
        `hero--${align}`,
        `hero--${height}`,
        hasImage ? "hero--with-image" : ""
      ].join(" ")}
      style={styleVars}
      aria-label={title || subtitle}
    >
      <div className="hero__wrap">
        {subtitle && <div className="hero__kicker">{subtitle}</div>}
        {title && <h1 className="hero__title">{title}</h1>}
        {description && <p className="hero__desc">{description}</p>}

        {actions?.length > 0 && (
          <div className="hero__actions">
            {actions.map((a, i) => (
              <a
                key={i}
                href={a.href}
                className={`hero__btn ${a.variant === "ghost" ? "hero__btn--ghost" : "hero__btn--primary"}`}
              >
                {a.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

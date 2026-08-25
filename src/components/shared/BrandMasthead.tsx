import React from 'react';
import { FallingCharms } from '../ui/FallingCharms';

const BRAND_NAME = 'Eternal Dedications';
const BRAND_TAGLINE = 'Regalos que se sienten · 19 de septiembre';

/* Longitud del trazo del flourish (>= longitud real del path) */
const FLOURISH_DASH_LENGTH = 400;

/* Degradado rojo con banda de luz central: base del efecto shimmer */
const TITLE_GRADIENT =
  'linear-gradient(90deg, #FDA4AF 0%, #E11D48 30%, #E11D48 45%, #FFE4EC 50%, #E11D48 55%, #E11D48 70%, #881337 100%)';

/**
 * Marca de cabecera: Pinyon Script rojo con shimmer premium,
 * flourish con corazón latiente y lluvia ambiental de encantos.
 */
export const BrandMasthead: React.FC = () => {
  return (
    <header className="relative px-4 pb-10 pt-8 text-center sm:pb-12 sm:pt-10">
      {/* Lluvia ambiental de corazones y estrellitas */}
      <FallingCharms count={6} />

      <p
        className="font-script bg-clip-text text-5xl leading-tight text-transparent animate-fade-in-up sm:text-6xl lg:text-7xl"
        style={{
          backgroundImage: TITLE_GRADIENT,
          backgroundSize: '200% 100%',
          animation:
            'shimmer-slide 4.5s ease-in-out infinite, fadeInUp 0.8s ease-out forwards',
          filter: 'drop-shadow(0 0 18px rgba(225, 29, 72, 0.3))',
        }}
      >
        {BRAND_NAME}
      </p>

      {/* Flourish decorativo que se dibuja solo (puro SVG + CSS) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 24"
        fill="none"
        className="mx-auto mt-1 h-6 w-52 text-dorado sm:w-64"
      >
        <path
          d="M6 14 C 60 2, 90 22, 104 13 C 108 10, 112 14, 116 11 C 136 2, 166 20, 214 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            strokeDasharray: FLOURISH_DASH_LENGTH,
            animation: 'flourish-draw 1.2s ease-out forwards',
          }}
        />
        {/* Corazón rojo latiendo en el centro del flourish */}
        <g
          transform="translate(102.5, 5) scale(0.625)"
          fill="#E11D48"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'heart-beat 1.8s ease-in-out infinite',
            filter: 'drop-shadow(0 1px 3px rgba(225, 29, 72, 0.4))',
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </g>
      </svg>

      <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-grafito sm:text-xs">
        {BRAND_TAGLINE}
      </p>
    </header>
  );
};

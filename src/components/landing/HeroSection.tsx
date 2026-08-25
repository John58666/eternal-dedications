import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { VideoWrapper } from '../ui/VideoWrapper';
import { CTAButton } from '../ui/CTAButton';
import { FallingPetals } from '../ui/FallingPetals';

/* Bullets exactos del spec §Bloque 1 */
const HERO_BULLETS = [
  '100% Digital',
  'Código QR descargable',
  'Experiencia inmersiva con música',
];

export const HeroSection: React.FC = () => {
  return (
    <SectionContainer>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Pétalos dorados, esquina superior izquierda, solo desktop (spec §Bloque 1) */}
        <FallingPetals count={7} className="left-0 top-0 hidden h-48 w-72 lg:block" />

        {/* Video 1 — primera posición también en móvil (stack: video → texto) */}
        <div className="rounded-2xl overflow-hidden shadow-xl animate-fade-in-up">
          <VideoWrapper videoNumber={1} />
        </div>

        <div className="space-y-6 text-center lg:text-left">
          <h1 className="font-heading font-black text-4xl lg:text-5xl text-zafiro leading-tight animate-fade-in-up">
            ¿No sabes qué regalarle este{' '}
            <span className="text-esmeralda">19 de Septiembre</span>?
          </h1>

          <p className="font-elegant font-semibold text-lg lg:text-xl italic text-grafito leading-relaxed animate-fade-in-up">
            El regalo que ella va a presumir.
          </p>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-2 stagger-1 animate-fade-in-up">
            {HERO_BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-1.5 text-sm font-medium text-zafiro"
              >
                <span className="text-esmeralda font-bold" aria-hidden="true">
                  ✔
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          <div className="animate-fade-in-up">
            <CTAButton href="#crear">Empezar mi plantilla gratis</CTAButton>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

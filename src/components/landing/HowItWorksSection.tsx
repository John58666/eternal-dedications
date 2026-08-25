import React from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { QrRevealCard } from '../ui/QrRevealCard';
import { BloomingFlower } from '../ui/BloomingFlower';
import { useIsMobile } from '../../hooks/useIsMobile';

interface QrStep {
  icon: string;
  title: string;
  description: string;
}

/* Pasos derivados del flujo FASE 1-3 de la hoja de ruta */
const QR_STEPS: QrStep[] = [
  {
    icon: '💌',
    title: 'Personaliza tu regalo',
    description: 'Su nombre, tu carta y la canción que los representa.',
  },
  {
    icon: '📦',
    title: 'Recibe tu QR físico',
    description: 'Código único e imprimible de alta gama, listo para regalar.',
  },
  {
    icon: '📱',
    title: 'Ella lo escanea…',
    description: 'y se abre su experiencia inmersiva con fotos, carta y música.',
  },
];

export const HowItWorksSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <SectionContainer className="py-20">
      <div className="relative">
        {/* Flor dorada junto al título — visible en móvil y desktop */}
        <BloomingFlower
          sizePixels={isMobile ? 84 : 110}
          className={`mb-2 ${isMobile ? 'mx-auto' : 'absolute -top-10 right-2'}`}
        />

        <div className="mb-12 space-y-3 text-center">
          <h2 className="font-heading font-black text-3xl lg:text-4xl text-zafiro animate-fade-in-up">
            🔓 El código secreto de ustedes
          </h2>
          <p className="font-elegant mx-auto max-w-2xl text-lg italic text-grafito animate-fade-in-up">
            Un QR físico que abre una experiencia hecha solo para ella.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in-up">
            <QrRevealCard />
          </div>

          <ol className="stagger-1 space-y-6">
            {QR_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="glass-card flex items-start gap-4 rounded-2xl p-5 shadow-md animate-fade-in-up"
              >
                {/* Insignia numerada — 44px, objetivo táctil accesible */}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-esmeralda-noche font-heading text-lg font-black text-white">
                  {index + 1}
                </span>
                <span>
                  <span className="font-heading block text-lg font-bold text-zafiro">
                    {step.icon} {step.title}
                  </span>
                  <span className="mt-1 block leading-relaxed text-grafito">
                    {step.description}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionContainer>
  );
};

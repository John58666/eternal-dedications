import React, { useState, useEffect } from 'react';
import { SectionContainer } from '../shared/SectionContainer';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FallingPetals } from '../ui/FallingPetals';
import { BloomingFlower } from '../ui/BloomingFlower';
import { useIsMobile } from '../../hooks/useIsMobile';

const TOTAL = 10000;

export const TrendSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(8364);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev <= 8000 ? 8364 : prev - 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const soldPercent = Math.round(((TOTAL - count) / TOTAL) * 100);

  return (
    <SectionContainer className="py-20">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <FallingPetals count={10} />
        {/* Video 5: Tendencia y FOMO */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <VideoWrapper videoNumber={5} />
          </div>
          <div className="bg-white border border-slate-300 rounded-2xl p-6 text-center shadow-md">
            <p className="text-sm font-bold uppercase tracking-wider text-red-600 animate-pulse">
              🔥 SOLO QUEDAN:
            </p>
            <span
              key={count}
              className="inline-block font-heading font-black text-5xl lg:text-6xl text-zafiro"
              style={{ animation: 'flip 0.5s ease' }}
            >
              {count.toLocaleString()}
            </span>
            <p className="text-sm text-gris-neutro">
              de {TOTAL.toLocaleString()} unidades a nivel nacional
            </p>
            {/* Barra de progreso de venta */}
            <div className="mt-4 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-esmeralda to-dorado transition-all duration-700"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
            <p className="text-xs text-gris-neutro mt-2 font-bold">
              ¡{soldPercent}% ya vendido!
            </p>
          </div>
        </div>

        <div className="text-center lg:text-left space-y-3">
          <BloomingFlower
            sizePixels={isMobile ? 76 : 96}
            className="mx-auto mb-4 lg:mx-0"
          />
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-zafiro">
            Creamos una ola gigante.
          </h2>
          <p className="text-lg text-grafito leading-relaxed">
            Miles de mujeres van a presumir esto en sus redes sociales, y solo un
            grupo selecto de novios será el responsable. Cerramos los servidores a{' '}
            <strong>10.000 unidades</strong>: una tendencia creada por ustedes y
            nosotros.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

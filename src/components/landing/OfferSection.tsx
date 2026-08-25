import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { VideoWrapper } from '../ui/VideoWrapper';
import { CTAButton } from '../ui/CTAButton';
import { FallingPetals } from '../ui/FallingPetals';
import { SectionContainer } from '../shared/SectionContainer';

export const OfferSection: React.FC = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <SectionContainer className="py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Video 6: La Oferta */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl mb-12">
          <VideoWrapper videoNumber={6} />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FallingPetals count={14} />
          {/* Precio — izquierda */}
          <div className="text-center lg:text-left space-y-3">
            {/* Ancla de precio (CRO): referencia de lanzamiento tachada */}
            <p className="font-price italic font-medium text-2xl sm:text-3xl text-gris-neutro line-through decoration-red-400 decoration-2">
              $90.000 COP
            </p>

            <p className="font-price font-black text-5xl sm:text-6xl lg:text-7xl text-zafiro leading-none">
              $30.000 <span className="text-xl sm:text-2xl tracking-[0.15em]">COP</span>
            </p>

            {/* Mini-flourish dorado que amarra la marca con el precio */}
            <svg
              aria-hidden="true"
              viewBox="0 0 80 10"
              fill="none"
              className="mx-auto h-2.5 w-20 text-dorado lg:mx-0"
            >
              <path
                d="M2 7 C 20 1, 60 1, 78 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
                💚 Ahorras $60.000
              </span>
              <span className="rounded-full bg-dorado/20 px-3 py-1 text-xs font-bold text-dorado-tinta">
                Lanzamiento −67%
              </span>
            </div>

            <p className="text-sm text-gris-neutro">
              ¿Quieres que dure para siempre?{' '}
              <span className="font-bold text-zafiro">Plan Eterno desde $50.000</span> ↗
            </p>

            <p className="font-elegant font-semibold text-lg italic text-grafito leading-relaxed max-w-md mx-auto lg:mx-0">
              Literalmente lo mismo que te cuesta la hamburguesa triple como les
              gustan a ellas. Pero esto no lo va a olvidar en su vida.
            </p>
          </div>

          {/* Botón gigante — derecha */}
          <div className="flex flex-col items-center gap-4">
            <CTAButton variant="giant" href="#crear">
              🎁 Hacer mi Plantilla Ya
            </CTAButton>
            <p className="text-sm text-gris-neutro font-bold">
              ⏳ Solo quedan 8,364 códigos
            </p>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};

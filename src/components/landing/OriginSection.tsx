import { SectionContainer } from '../shared/SectionContainer';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FloatingHearts } from '../ui/FloatingHearts';
import { useInViewport } from '../../hooks/useInViewport';

export const OriginSection = () => {
  /* El sneak peek se enfoca (reduce su blur) al entrar en viewport — spec §Bloque 2 */
  const { ref: sneakPeekRef, isInViewport: isSneakPeekInFocus } =
    useInViewport<HTMLDivElement>(0.4);

  return (
    <SectionContainer className="py-20">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <FloatingHearts count={3} color="#fb7185" />
        {/* Video 2: Empatía y Origen — a la DERECHA en desktop (zigzag solicitado) */}
        <div className="rounded-2xl overflow-hidden shadow-xl lg:order-2">
          <VideoWrapper videoNumber={2} />
        </div>

        {/* Sneak Peek difuminado — a la IZQUIERDA en desktop */}
        <div className="text-center lg:text-left space-y-6 lg:order-1">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-zafiro">
            De hombres, para hombres
          </h2>
          <p className="font-elegant font-semibold text-lg italic text-grafito leading-relaxed">
            Sabemos exactamente qué es lo que les emociona recibir.
          </p>

          {/* Vista previa borrosa del regalo — misma estética rosa del producto */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-pink-200 select-none" aria-hidden="true">
            <div
              ref={sneakPeekRef}
              className={`bg-gradient-to-b from-[#FFE4EC] via-[#FECDD3] to-[#FDA4AF] p-8 text-center scale-[1.02] transition-[filter] duration-700 ${
                isSneakPeekInFocus ? 'blur-[2px]' : 'blur-md'
              }`}
            >
              <p className="text-pink-700 uppercase tracking-widest text-xs mb-3">
                Un mensaje para
              </p>
              <p className="font-heading font-bold text-zafiro text-3xl mb-3">Camila ❤️</p>
              <p className="text-pink-900/80 leading-relaxed max-w-xs mx-auto">
                Cada momento a tu lado ha sido la mejor historia que he vivido...
              </p>

              {/* Slots del producto real: foto + música */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-300 bg-white/70 text-xl">
                  🖼️
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-300 bg-white/70 text-xl">
                  ♪
                </span>
              </div>

              <p className="mt-4 text-pink-800/70">— Tu amor</p>
            </div>
            {/* Candado + CTA al formulario (curiosity gap → conversión) */}
            <a href="#crear" className="group absolute inset-0 flex items-center justify-center">
              <span className="bg-pink-600/90 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
                🔒 Desbloquéalo al comprar
              </span>
            </a>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

#!/bin/bash

# ============================================
# SCRIPT DE INSTALACIÓN - ZYVEN XPERIENCE
# ============================================

echo "🛠️  Creando estructura de archivos..."

# 1. Crear carpetas
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/components/ui
mkdir -p src/components/shared
mkdir -p src/components/landing

# 2. Archivos de hooks
cat > src/hooks/useScrollAnimation.ts << 'EOF'
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  return { ref, isInView };
};
EOF

cat > src/hooks/useMediaQuery.ts << 'EOF'
import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
};
EOF

# 3. Archivo de tipos
cat > src/types/index.ts << 'EOF'
export interface FormData {
  nombreElla: string;
  mensaje: string;
  tuNombre: string;
}
EOF

# 4. Componentes UI
cat > src/components/ui/VideoWrapper.tsx << 'EOF'
export const VideoWrapper = ({ videoNumber }: { videoNumber: number }) => {
  return (
    <div className="w-full aspect-video bg-gray-200 rounded-2xl flex items-center justify-center shadow-md">
      <span className="text-gray-500 font-medium">[ Video {videoNumber} - Placeholder ]</span>
    </div>
  );
};
EOF

cat > src/components/ui/PhoneMockup3D.tsx << 'EOF'
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface PhoneMockup3DProps {
  nombreElla: string;
  mensaje: string;
  tuNombre: string;
}

export const PhoneMockup3D = ({ nombreElla, mensaje, tuNombre }: PhoneMockup3DProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('🌸 Toca para abrir');
  const containerRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setShowConfetti(true);
    setButtonText('¡Gracias por confiar en nosotros! ❤️');
    setTimeout(() => setShowConfetti(false), 2500);
  };

  const width = containerRef.current?.clientWidth || 300;
  const height = containerRef.current?.clientHeight || 500;

  return (
    <div ref={containerRef} className="relative w-[280px] sm:w-[280px] mx-auto">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          colors={['#D4AF37', '#FDE047', '#FBBF24']}
          numberOfPieces={100}
          gravity={0.3}
          confettiSource={{ x: width / 2, y: height / 2, w: 0, h: 0 }}
          recycle={false}
        />
      )}
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{ perspective: 1000 }}
        className="w-[280px] h-[550px] rounded-[2.5rem] bg-zafiro p-3 shadow-2xl mx-auto"
      >
        <div className="w-full h-full rounded-[1.75rem] bg-white p-5 flex flex-col items-center justify-between">
          <div className="text-center">
            <h4 className="font-heading text-2xl font-bold text-zafiro">
              Para {nombreElla || '...'}
            </h4>
          </div>
          <div className="flex-1 w-full bg-perla rounded-xl p-3 flex items-center justify-center text-center">
            <p className="text-sm text-grafito italic line-clamp-4">
              {mensaje || 'Escribe un mensaje...'}
            </p>
          </div>
          <div className="w-full text-center">
            <p className="text-xs text-gris-neutro">— {tuNombre || 'Tu nombre'}</p>
            <button
              onClick={handleOpen}
              disabled={isOpen}
              className={`mt-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-zafiro font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition ${
                isOpen ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
EOF

cat > src/components/ui/FallingPetals.tsx << 'EOF'
interface FallingPetalsProps {
  count?: number;
}

export const FallingPetals = ({ count = 5 }: FallingPetalsProps) => {
  const petals = Array.from({ length: count }, (_, i) => {
    const duration = 8 + Math.random() * 6;
    const delay = Math.random() * 5;
    const left = Math.random() * 100;
    return (
      <div
        key={i}
        className="fixed text-2xl pointer-events-none z-0"
        style={{
          left: `${left}%`,
          top: '-10vh',
          animation: `fall ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          willChange: 'transform',
          color: '#D4AF37',
        }}
      >
        🌸
      </div>
    );
  });

  return <>{petals}</>;
};
EOF

cat > src/components/ui/FloatingHearts.tsx << 'EOF'
interface FloatingHeartsProps {
  count?: number;
  color?: string;
}

export const FloatingHearts = ({ count = 3, color = '#D4AF37' }: FloatingHeartsProps) => {
  const hearts = Array.from({ length: count }, (_, i) => {
    const top = 20 + Math.random() * 60;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    return (
      <div
        key={i}
        className="absolute pointer-events-none text-2xl"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          animation: `floatHeart 3s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          color: color,
        }}
      >
        💕
      </div>
    );
  });

  return <>{hearts}</>;
};
EOF

cat > src/components/ui/CTAButton.tsx << 'EOF'
import type { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'giant';
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export const CTAButton = ({
  children,
  variant = 'primary',
  onClick,
  href,
  disabled = false,
}: CTAButtonProps) => {
  const baseStyles =
    'bg-esmeralda hover:bg-esmeralda-dark text-white font-bold rounded-2xl shadow-lg transition-all hover:-translate-y-1 inline-block text-center';
  const sizeStyles = variant === 'giant' ? 'text-xl py-6 px-12' : 'py-4 px-8';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:-translate-y-0' : '';

  const className = `${baseStyles} ${sizeStyles} ${disabledStyles} animate-pulse-glow`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};
EOF

# 5. Componente shared
cat > src/components/shared/SectionContainer.tsx << 'EOF'
import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionContainer = ({
  children,
  className = '',
  id,
}: SectionContainerProps) => {
  return (
    <div
      id={id}
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ${className}`}
    >
      {children}
    </div>
  );
};
EOF

# 6. Componentes de landing
cat > src/components/landing/StickyBar.tsx << 'EOF'
export const StickyBar = () => {
  return (
    <div className="bg-zafiro text-white text-center py-3 text-sm font-bold sticky top-0 z-50">
      🔥 TENDENCIA NACIONAL: Solo quedan 8,364 unidades disponibles 🔥
    </div>
  );
};
EOF

cat > src/components/landing/HeroSection.tsx << 'EOF'
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { CTAButton } from '../ui/CTAButton';
import { FallingPetals } from '../ui/FallingPetals';
import { SectionContainer } from '../shared/SectionContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const HeroSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
        <FallingPetals count={5} />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <VideoWrapper videoNumber={1} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="font-heading font-extrabold text-4xl lg:text-5xl text-zafiro leading-tight">
            ¿No sabes qué regalarle este 19 de Septiembre?
          </h1>
          <p className="text-lg lg:text-xl text-grafito leading-relaxed">
            El regalo que ella va a presumir.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-medium text-zafiro">
            <span className="flex items-center gap-1">
              <span className="text-esmeralda">✅</span> 100% Digital
            </span>
            <span className="flex items-center gap-1">
              <span className="text-esmeralda">✅</span> Código QR descargable
            </span>
            <span className="flex items-center gap-1">
              <span className="text-esmeralda">✅</span> Experiencia inmersiva
            </span>
          </div>
          <CTAButton href="#crear">Empezar mi plantilla gratis</CTAButton>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
EOF

cat > src/components/landing/OriginSection.tsx << 'EOF'
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FloatingHearts } from '../ui/FloatingHearts';
import { SectionContainer } from '../shared/SectionContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const OriginSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <SectionContainer className="bg-perla rounded-[2rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
        <FloatingHearts count={3} />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="w-[220px] sm:w-[280px] h-[440px] sm:h-[550px] bg-zafiro rounded-[2.5rem] p-3 shadow-2xl mx-auto lg:mx-0 backdrop-blur-md transition-all duration-700 hover:backdrop-blur-sm">
            <div className="w-full h-full rounded-[1.75rem] bg-white p-5 flex flex-col items-center justify-center text-center">
              <h4 className="font-heading text-xl font-bold text-zafiro">Para Camila...</h4>
              <div className="w-32 h-32 bg-gray-200 rounded-xl my-4" />
              <p className="text-sm text-grafito italic">Te amo...</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-zafiro">
            De hombres, para hombres
          </h2>
          <p className="text-lg text-grafito">
            Sabemos exactamente qué es lo que les emociona recibir.
          </p>
          <VideoWrapper videoNumber={2} />
        </motion.div>
      </div>
    </SectionContainer>
  );
};
EOF

cat > src/components/landing/LivePreviewSection.tsx << 'EOF'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { PhoneMockup3D } from '../ui/PhoneMockup3D';
import { FallingPetals } from '../ui/FallingPetals';
import { FloatingHearts } from '../ui/FloatingHearts';
import { SectionContainer } from '../shared/SectionContainer';
import type { FormData } from '../../types';

export const LivePreviewSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nombreElla: '',
    mensaje: '',
    tuNombre: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    setErrors((prev: Partial<FormData>) => ({ ...prev, [name]: '' }));
  };

  const handleNext = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombreElla.trim()) newErrors.nombreElla = 'Completa todos los campos';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Completa todos los campos';
    if (!formData.tuNombre.trim()) newErrors.tuNombre = 'Completa todos los campos';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);

  return (
    <SectionContainer id="crear">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
        <FallingPetals count={5} />
        <FloatingHearts count={3} />
        <div>
          <VideoWrapper videoNumber={3} />
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-zafiro mt-6">
            Tú tienes el control total
          </h2>
          <p className="text-lg text-grafito">Crea una experiencia inmersiva en 3 pasos.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-zafiro">✏️ Paso 1: Escribe tu dedicatoria</h3>
              <div>
                <label className="block text-sm font-medium text-grafito">Nombre de ella</label>
                <input
                  type="text"
                  name="nombreElla"
                  placeholder="Ej. Camila"
                  maxLength={30}
                  value={formData.nombreElla}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-zafiro ${
                    errors.nombreElla ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nombreElla && <p className="text-red-500 text-sm">{errors.nombreElla}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-grafito">Tu mensaje</label>
                <textarea
                  name="mensaje"
                  placeholder="Escribe desde el corazón..."
                  maxLength={200}
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-zafiro ${
                    errors.mensaje ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.mensaje && <p className="text-red-500 text-sm">{errors.mensaje}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-grafito">Tu nombre</label>
                <input
                  type="text"
                  name="tuNombre"
                  placeholder="Ej. Juan"
                  maxLength={30}
                  value={formData.tuNombre}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-1 focus:ring-zafiro ${
                    errors.tuNombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.tuNombre && <p className="text-red-500 text-sm">{errors.tuNombre}</p>}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-esmeralda hover:bg-esmeralda-dark text-white font-bold py-2 px-6 rounded-xl transition"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h3 className="font-heading font-bold text-xl text-zafiro">📱 Paso 2: Previsualización 3D</h3>
              <PhoneMockup3D
                nombreElla={formData.nombreElla}
                mensaje={formData.mensaje}
                tuNombre={formData.tuNombre}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  className="bg-gray-200 hover:bg-gray-300 text-grafito font-bold py-2 px-6 rounded-xl transition"
                >
                  ← Atrás
                </button>
                <button
                  onClick={() => alert('Próximamente: Redirigiendo al checkout')}
                  className="bg-esmeralda hover:bg-esmeralda-dark text-white font-bold py-2 px-6 rounded-xl transition"
                >
                  ¡Me encanta! → Pagar
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};
EOF

cat > src/components/landing/ValidationSection.tsx << 'EOF'
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FloatingHearts } from '../ui/FloatingHearts';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const ValidationSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div className="w-full bg-zafiro py-16 lg:py-20 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <FloatingHearts count={2} color="#ffffff" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="font-heading font-bold text-3xl lg:text-4xl text-white">
          Aprobado y Validado por Ellas
        </h2>
        <div className="mt-6 border-2 border-perla rounded-2xl overflow-hidden shadow-xl">
          <VideoWrapper videoNumber={4} />
        </div>
        <p className="text-perla text-lg mt-4 max-w-2xl mx-auto">
          Diseñado con lógica de ingenieros, aprobado por la emoción de ellas.
        </p>
      </motion.div>
    </div>
  );
};
EOF

cat > src/components/landing/TrendSection.tsx << 'EOF'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { FallingPetals } from '../ui/FallingPetals';
import { SectionContainer } from '../shared/SectionContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const TrendSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [count, setCount] = useState(8364);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 8000) return 8364;
        return prev - 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
        <FallingPetals count={5} />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          <VideoWrapper videoNumber={5} />
          <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-md">
            <p className="text-sm font-bold uppercase tracking-wider text-red-500">
              🔥 SOLO QUEDAN:
            </p>
            <p className="font-heading font-black text-5xl lg:text-6xl text-zafiro animate-flip">
              {count.toLocaleString()}
            </p>
            <p className="text-sm text-gris-neutro">unidades disponibles</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <h3 className="font-heading font-bold text-2xl lg:text-3xl text-zafiro">
            Hazla parte de la tendencia.
          </h3>
          <p className="text-grafito mt-2">
            Miles de mujeres van a presumir esto en sus redes sociales.
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
EOF

cat > src/components/landing/OfferSection.tsx << 'EOF'
import { motion } from 'framer-motion';
import { VideoWrapper } from '../ui/VideoWrapper';
import { CTAButton } from '../ui/CTAButton';
import { FallingPetals } from '../ui/FallingPetals';
import { SectionContainer } from '../shared/SectionContainer';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export const OfferSection = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
        <FallingPetals count={10} />
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <VideoWrapper videoNumber={6} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="space-y-6 text-center lg:text-left"
        >
          <p className="font-heading font-black text-5xl lg:text-6xl text-zafiro">
            $30.000 COP
          </p>
          <p className="text-lg text-grafito leading-relaxed">
            Literalmente lo mismo que te cuesta la hamburguesa triple que tanto les gusta a ellas, pero esto lo recordará toda la vida.
          </p>
          <div className="relative inline-block">
            <CTAButton variant="giant" href="/crear">
              Hacer mi Plantilla Ahora
            </CTAButton>
            <span className="absolute -top-3 -right-6 text-xs font-bold text-dorado rotate-[-10deg] bg-white px-2 py-1 rounded shadow-lg">
              Oferta Exclusiva
            </span>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};
EOF

cat > src/components/landing/Footer.tsx << 'EOF'
export const Footer = () => {
  return (
    <div className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gris-neutro">
      <p>💳 Pago seguro vía ePayco / Davivienda</p>
      <p className="mt-1">© 2026 Zyven Experiences. Todos los derechos reservados.</p>
    </div>
  );
};
EOF

# 7. App.tsx
cat > src/App.tsx << 'EOF'
import { StickyBar } from './components/landing/StickyBar';
import { HeroSection } from './components/landing/HeroSection';
import { OriginSection } from './components/landing/OriginSection';
import { LivePreviewSection } from './components/landing/LivePreviewSection';
import { ValidationSection } from './components/landing/ValidationSection';
import { TrendSection } from './components/landing/TrendSection';
import { OfferSection } from './components/landing/OfferSection';
import { Footer } from './components/landing/Footer';

function App() {
  return (
    <>
      <StickyBar />
      <HeroSection />
      <OriginSection />
      <LivePreviewSection />
      <ValidationSection />
      <TrendSection />
      <OfferSection />
      <Footer />
    </>
  );
}

export default App;
EOF

echo "✅ Todos los archivos creados correctamente."
echo "🚀 Ahora ejecuta: npm run dev"

import React from 'react';
import { pseudoRandomFraction } from '../../utils/pseudoRandom';
import { useIsMobile } from '../../hooks/useIsMobile';

interface FallingPetalsProps {
  count: number;
  /** Sobrescribe el posicionamiento por defecto (inset-0); ej. esquina del Hero */
  className?: string;
}

/* Paleta dorada del spec §4: Dorado Suave #D4AF37 + variantes */
const PETAL_COLORS = ['#D4AF37', '#E2BE4B', '#C9A227'];

export const FallingPetals: React.FC<FallingPetalsProps> = ({ count, className }) => {
  const isMobile = useIsMobile();

  /* En móvil se reduce a la mitad para no saturar la pantalla */
  const petalCount = isMobile ? Math.max(2, Math.ceil(count / 2)) : count;

  const petals = Array.from({ length: petalCount }, (_, index) => ({
    id: index,
    leftPercent: 5 + pseudoRandomFraction(index * 7 + 13) * 90,
    delaySeconds: index * 0.5,
    durationSeconds: 7 + pseudoRandomFraction(index * 11 + 29) * 4,
    sizePixels: 16 + pseudoRandomFraction(index * 5 + 41) * 12,
    /* Forma de pétalo real: bordes asimétricos alternados (task.md 1.3) */
    borderRadius: index % 2 === 0 ? '80% 0 80% 0' : '0 80% 0 80%',
    color: PETAL_COLORS[index % PETAL_COLORS.length],
    opacity: 0.55 + pseudoRandomFraction(index * 3 + 67) * 0.35,
  }));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-hidden ${className ?? 'inset-0'}`}
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute"
          style={{
            width: petal.sizePixels,
            height: petal.sizePixels,
            left: `${petal.leftPercent}%`,
            top: '-8%',
            background: `linear-gradient(135deg, ${petal.color} 0%, #FDE04799 100%)`,
            borderRadius: petal.borderRadius,
            animation: `fall ${petal.durationSeconds}s linear ${petal.delaySeconds}s infinite`,
            willChange: 'transform',
            opacity: petal.opacity,
          }}
        />
      ))}
    </div>
  );
};

import React from 'react';
import { pseudoRandomFraction } from '../../utils/pseudoRandom';
import { useIsMobile } from '../../hooks/useIsMobile';

interface FallingCharmsProps {
  count?: number;
  className?: string;
}

const DEFAULT_COUNT = 6;

/* Corazones rojos + estrellitas doradas, alternados */
const CHARM_TYPES = [
  { char: '♥', color: '#E11D48' },
  { char: '✦', color: '#D4AF37' },
  { char: '♥', color: '#FB7185' },
  { char: '✦', color: '#FBBF24' },
] as const;

/**
 * Lluvia ambiental de encantos acotada al contenedor padre.
 * Sutil a propósito: no compite con el shimmer del título.
 */
export const FallingCharms: React.FC<FallingCharmsProps> = ({
  count = DEFAULT_COUNT,
  className,
}) => {
  const isMobile = useIsMobile();

  const charmCount = isMobile ? Math.max(3, Math.ceil(count / 2)) : count;

  const charms = Array.from({ length: charmCount }, (_, index) => {
    const type = CHARM_TYPES[index % CHARM_TYPES.length];
    return {
      id: index,
      char: type.char,
      color: type.color,
      leftPercent: 4 + pseudoRandomFraction(index * 9 + 23) * 92,
      delaySeconds: index * 1.3,
      durationSeconds: 6 + pseudoRandomFraction(index * 7 + 37) * 4,
      sizePixels: 9 + pseudoRandomFraction(index * 5 + 53) * 6,
    };
  });

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
    >
      {charms.map((charm) => (
        <span
          key={charm.id}
          className="absolute select-none"
          style={{
            top: '-14px',
            left: `${charm.leftPercent}%`,
            fontSize: charm.sizePixels,
            lineHeight: 1,
            color: charm.color,
            textShadow:
              charm.char === '✦' ? '0 0 6px rgba(212, 175, 55, 0.45)' : undefined,
            animation: `charm-drift ${charm.durationSeconds}s linear ${charm.delaySeconds}s infinite`,
            willChange: 'transform',
          }}
        >
          {charm.char}
        </span>
      ))}
    </div>
  );
};

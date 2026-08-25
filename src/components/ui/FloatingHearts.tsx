import React from 'react';
import { pseudoRandomFraction } from '../../utils/pseudoRandom';
import { useIsMobile } from '../../hooks/useIsMobile';

interface FloatingHeartsProps {
  count: number;
  color?: string;
}

const DEFAULT_COLOR = '#f472b6';

/* Carácter ♥ en vez de emoji: permite colorearlo (blanco en Validación) */
const HEART_CHAR = '♥';

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  count,
  color = DEFAULT_COLOR,
}) => {
  const isMobile = useIsMobile();

  const heartCount = isMobile ? Math.max(1, Math.ceil(count / 2)) : count;

  const hearts = Array.from({ length: heartCount }, (_, index) => ({
    id: index,
    leftPercent: 5 + pseudoRandomFraction(index * 9 + 17) * 90,
    delaySeconds: index * 0.8,
    durationSeconds: 5 + pseudoRandomFraction(index * 13 + 31) * 3,
    sizePixels: 16 + pseudoRandomFraction(index * 6 + 47) * 10,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute select-none"
          style={{
            fontSize: heart.sizePixels * 1.6,
            lineHeight: 1,
            color,
            left: `${heart.leftPercent}%`,
            bottom: '10%',
            textShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
            animation: `floatHeart ${heart.durationSeconds}s ease-in-out ${heart.delaySeconds}s infinite`,
            opacity: 0.9,
          }}
        >
          {HEART_CHAR}
        </span>
      ))}
    </div>
  );
};

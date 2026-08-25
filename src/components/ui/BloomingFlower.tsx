import React from 'react';
import { useInViewport } from '../../hooks/useInViewport';

interface BloomingFlowerProps {
  sizePixels?: number;
  petalCount?: number;
  className?: string;
}

const DEFAULT_SIZE_PX = 120;
const DEFAULT_PETAL_COUNT = 8;
const BLOOM_STAGGER_MS = 60;

export const BloomingFlower: React.FC<BloomingFlowerProps> = ({
  sizePixels = DEFAULT_SIZE_PX,
  petalCount = DEFAULT_PETAL_COUNT,
  className,
}) => {
  /* La flor florece al entrar en viewport (mismo patrón que OriginSection) */
  const { ref: flowerRef, isInViewport: hasBloomed } = useInViewport<HTMLDivElement>(0.5);

  const petalWidth = sizePixels * 0.36;
  const petalHeight = sizePixels * 0.5;
  const orbitRadius = sizePixels * 0.24;
  const centerDiameter = sizePixels * 0.24;

  const bloomStyle = (delayIndex: number): React.CSSProperties =>
    hasBloomed
      ? {
          animation: `bloom-petal 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${
            delayIndex * BLOOM_STAGGER_MS
          }ms both`,
        }
      : { transform: 'scale(0)' };

  return (
    <div
      ref={flowerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className ?? ''}`}
      style={{
        width: sizePixels,
        height: sizePixels,
        animation: hasBloomed ? 'flower-sway 6s ease-in-out infinite' : undefined,
      }}
    >
      {/* Pétalos radiales: rotación estática fuera, bloom animado dentro */}
      {Array.from({ length: petalCount }, (_, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2"
          style={{
            width: petalWidth,
            height: petalHeight,
            marginLeft: -petalWidth / 2,
            marginTop: -petalHeight / 2,
            transform: `rotate(${index * (360 / petalCount)}deg) translateY(-${orbitRadius}px)`,
          }}
        >
          <span
            className="block h-full w-full"
            style={{
              borderRadius: '80% 0 80% 0',
              background: 'linear-gradient(135deg, #D4AF37 0%, #FDE047CC 100%)',
              boxShadow: '0 1px 4px rgba(180, 140, 20, 0.35)',
              ...bloomStyle(index),
            }}
          />
        </span>
      ))}

      {/* Centro dorado */}
      <span
        className="absolute left-1/2 top-1/2"
        style={{
          width: centerDiameter,
          height: centerDiameter,
          marginLeft: -centerDiameter / 2,
          marginTop: -centerDiameter / 2,
        }}
      >
        <span
          className="block h-full w-full rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FDE047, #D4AF37)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
            ...bloomStyle(petalCount),
          }}
        />
      </span>
    </div>
  );
};

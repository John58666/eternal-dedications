import React from 'react';

interface PhoneFrameProps {
  rotateX: number;
  rotateY: number;
  /** Normalizados a -1..1: desplazan sombras contra la inclinación */
  edgeX: number;
  edgeY: number;
  children: React.ReactNode;
}

/* Botones físicos del marco (power + volumen) */
const SIDE_BUTTONS = [
  { id: 'power', side: 'right' as const, topPercent: '22%', heightPixels: 56 },
  { id: 'volume-up', side: 'left' as const, topPercent: '18%', heightPixels: 34 },
  { id: 'volume-down', side: 'left' as const, topPercent: '27%', heightPixels: 34 },
];

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  rotateX,
  rotateY,
  edgeX,
  edgeY,
  children,
}) => {
  /* Extrusión de bordes: la sombra se desplaza contra la inclinación */
  const frameShadow = [
    `${edgeX * 16}px ${edgeY * 20 + 26}px 45px rgba(225, 29, 72, 0.25)`,
    `${edgeX * 4}px ${edgeY * 4}px 12px rgba(190, 24, 93, 0.2)`,
    `inset ${edgeX * 2}px ${edgeY * 2}px 3px rgba(255, 255, 255, 0.65)`,
    `inset ${-edgeX * 2}px ${-edgeY * 2}px 3px rgba(159, 18, 57, 0.4)`,
  ].join(', ');

  return (
    <div
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* LAYER 1: Bisel metálico rosa-dorado */}
      <div
        style={{
          borderRadius: '2.75rem',
          padding: 4,
          background:
            'linear-gradient(145deg, #fce7f3 0%, #f472b6 30%, #be185d 52%, #f9a8d4 78%, #fdf2f8 100%)',
          boxShadow: frameShadow,
          transition: 'box-shadow 0.15s ease-out',
          position: 'relative',
        }}
      >
        {SIDE_BUTTONS.map((button) => (
          <div
            key={button.id}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: button.side === 'left' ? -2 : undefined,
              right: button.side === 'right' ? -2 : undefined,
              top: button.topPercent,
              width: 3,
              height: button.heightPixels,
              borderRadius: 3,
              background: 'linear-gradient(#f9a8d4, #be185d)',
              transform: 'translateZ(-2px)',
            }}
          />
        ))}

        {/* LAYER 2: Carcasa interior rosa pálido */}
        <div style={{ borderRadius: '2.5rem', padding: 7, background: '#fff1f2' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

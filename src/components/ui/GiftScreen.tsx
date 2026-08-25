import React from 'react';

interface GiftScreenProps {
  nombreElla: string;
  mensaje: string;
  tuNombre: string;
  isPressed: boolean;
  hasOpenedGift: boolean;
  onOpen: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export const GiftScreen: React.FC<GiftScreenProps> = ({
  nombreElla,
  mensaje,
  tuNombre,
  isPressed,
  hasOpenedGift,
  onOpen,
  buttonRef,
}) => {
  return (
    <div
      className="flex h-[420px] w-[210px] flex-col items-center justify-center overflow-hidden px-4 text-center sm:h-[500px] sm:w-[250px] sm:px-5"
      style={{
        borderRadius: '2rem',
        background:
          'radial-gradient(ellipse at 50% 0%, #ffe4ec 0%, #fecdd3 55%, #fda4af 100%)',
      }}
    >
      {/* Patrón de puntos rosados sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(219, 39, 119, 0.14) 1.5px, transparent 1.5px)',
          backgroundSize: '18px 18px',
          zIndex: 1,
        }}
      />

      {/* Dynamic Island con lente de cámara */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 74,
          height: 20,
          borderRadius: 999,
          background: '#1c1022',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 6,
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 35%, #3b1d33 0%, #0a0510 100%)',
            boxShadow: 'inset 0 0 1px 0.5px rgba(255,255,255,0.1)',
          }}
        />
      </div>

      {/* Reflejo de pantalla */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 2,
          background:
            'radial-gradient(ellipse at 28% 12%, rgba(255,255,255,0.35) 0%, transparent 45%), radial-gradient(ellipse at 75% 88%, rgba(255,255,255,0.18) 0%, transparent 40%)',
        }}
      />

      {/* Contenido de la tarjeta de regalo */}
      <span
        aria-hidden="true"
        className="mt-9 text-4xl drop-shadow-md sm:text-5xl"
        style={{ zIndex: 3 }}
      >
        🎀
      </span>

      <p
        className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-pink-700 sm:text-xs"
        style={{ zIndex: 3 }}
      >
        Un mensaje para
      </p>

      <h3
        className="font-heading mt-1 text-xl font-black leading-tight break-words text-pink-700 drop-shadow-sm sm:text-2xl"
        style={{ zIndex: 3 }}
      >
        {nombreElla}
      </h3>

      <p
        className="mt-3 max-h-28 max-w-full overflow-hidden whitespace-pre-wrap break-words text-[11px] italic leading-relaxed text-pink-900/80 sm:max-h-44 sm:text-sm"
        style={{ zIndex: 3 }}
      >
        {mensaje}
      </p>

      <p
        className="mt-3 text-xs font-semibold text-pink-700/70 sm:text-sm"
        style={{ zIndex: 3 }}
      >
        — Con amor, {tuNombre}
      </p>

      {/* Botón "Toca para abrir" — se desactiva tras abrir (spec §Bloque 3) */}
      <button
        ref={buttonRef}
        type="button"
        onMouseDown={onOpen}
        onTouchStart={onOpen}
        disabled={hasOpenedGift}
        aria-disabled={hasOpenedGift}
        className="font-heading mt-6 rounded-full px-5 py-2.5 text-xs font-bold text-white transition-all duration-150 disabled:cursor-default sm:mt-8 sm:px-6 sm:text-sm"
        style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
          transform: `scale(${isPressed ? 0.9 : 1})`,
          boxShadow: '0 0 22px rgba(236, 72, 153, 0.55)',
          animation: hasOpenedGift ? 'none' : 'pulse-glow 2.2s infinite',
          cursor: hasOpenedGift ? 'default' : 'pointer',
          opacity: hasOpenedGift ? 0.7 : 1,
          zIndex: 3,
        }}
      >
        {hasOpenedGift ? '¡Gracias por confiar en nosotros! ❤️' : '💌 Toca para abrir'}
      </button>
    </div>
  );
};

import React, { useCallback, useRef, useState } from 'react';
import { ConfettiBurst } from './ConfettiBurst';
import { GiftScreen } from './GiftScreen';
import { PhoneFrame } from './PhoneFrame';

interface PhoneMockup3DProps {
  nombreElla: string;
  mensaje: string;
  tuNombre: string;
}

const MAX_TILT_DEGREES = 12;
const REST_TILT = { rotateX: -5, rotateY: -12 };
const PRESS_FEEDBACK_MS = 150;

export const PhoneMockup3D: React.FC<PhoneMockup3DProps> = ({
  nombreElla,
  mensaje,
  tuNombre,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const [tilt, setTilt] = useState(REST_TILT);
  const [isPressed, setIsPressed] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(
    null
  );
  /* Tras abrir el regalo el botón agradece y se desactiva (spec §Bloque 3) */
  const [hasOpenedGift, setHasOpenedGift] = useState(false);

  /* Tilt interactivo basado en posición del puntero */
  const tiltFromPoint = useCallback((clientX: number, clientY: number) => {
    const element = containerRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      rotateX: -normalizedY * MAX_TILT_DEGREES,
      rotateY: normalizedX * MAX_TILT_DEGREES,
    });
  }, []);

  const handleMouseMove = (event: React.MouseEvent) =>
    tiltFromPoint(event.clientX, event.clientY);

  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) tiltFromPoint(touch.clientX, touch.clientY);
  };

  const handleMouseLeave = () => setTilt(REST_TILT);

  const handlePress = () => {
    if (hasOpenedGift) return;
    setIsPressed(true);
    window.setTimeout(() => setIsPressed(false), PRESS_FEEDBACK_MS);

    /* Confeti desde el centro físico del botón (requisito original) */
    const buttonElement = openButtonRef.current;
    if (!buttonElement) return;
    const rect = buttonElement.getBoundingClientRect();
    setConfettiOrigin({
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    });

    setHasOpenedGift(true);
  };

  /* Extrusión de bordes: la sombra se desplaza contra la inclinación */
  const edgeX = -(tilt.rotateY / MAX_TILT_DEGREES);
  const edgeY = tilt.rotateX / MAX_TILT_DEGREES;

  return (
    <div className="flex justify-center px-4 py-8 sm:py-10">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        style={{ perspective: '800px' }}
      >
        <PhoneFrame
          rotateX={tilt.rotateX}
          rotateY={tilt.rotateY}
          edgeX={edgeX}
          edgeY={edgeY}
        >
          <GiftScreen
            nombreElla={nombreElla}
            mensaje={mensaje}
            tuNombre={tuNombre}
            isPressed={isPressed}
            hasOpenedGift={hasOpenedGift}
            onOpen={handlePress}
            buttonRef={openButtonRef}
          />
        </PhoneFrame>

        {/* Sombra proyectada en el suelo */}
        <div
          aria-hidden="true"
          className="mx-auto h-6 w-36 sm:h-7 sm:w-44"
          style={{
            marginTop: 22,
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(225, 29, 72, 0.3) 0%, transparent 70%)',
            filter: 'blur(6px)',
            transform: `translateX(${edgeX * 14}px) scaleX(${1 + Math.abs(edgeX) * 0.15})`,
            transition: 'transform 0.15s ease-out',
          }}
        />
      </div>

      {/* Confeti disparado desde el centro del botón */}
      {confettiOrigin && (
        <ConfettiBurst
          originXFraction={confettiOrigin.x}
          originYFraction={confettiOrigin.y}
          onComplete={() => setConfettiOrigin(null)}
        />
      )}
    </div>
  );
};

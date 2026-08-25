import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

/* Dorados del spec §Bloque 3 + rosa/blanco del requisito original */
const CONFETTI_COLORS = ['#D4AF37', '#FDE047', '#FBBF24', '#f472b6', '#ec4899', '#ffffff'];

interface ConfettiBurstProps {
  /* Origen del disparo como fracción del viewport (0-1) */
  originXFraction: number;
  originYFraction: number;
  durationMs?: number;
  onComplete: () => void;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  originXFraction,
  originYFraction,
  durationMs = 2600,
  onComplete,
}) => {
  const { width, height } = useWindowSize();

  /* Ref evita reiniciar el temporizador en cada re-render del padre */
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const timeoutId = window.setTimeout(() => onCompleteRef.current(), durationMs);
    return () => window.clearTimeout(timeoutId);
  }, [durationMs]);

  if (width === 0 || height === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={220}
        recycle={false}
        gravity={0.25}
        initialVelocityY={-18}
        confettiSource={{
          x: width * originXFraction,
          y: height * originYFraction,
          w: 10,
          h: 10,
        }}
        colors={CONFETTI_COLORS}
      />
    </div>
  );
};

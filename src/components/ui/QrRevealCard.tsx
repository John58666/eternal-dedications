import React, { useState } from 'react';
import { pseudoRandomFraction } from '../../utils/pseudoRandom';

const QR_GRID_SIZE = 11;
const SCAN_LOOP_SECONDS = 3.2;

type CardView = 'qr' | 'gift';

interface QrCell {
  row: number;
  col: number;
  isFilled: boolean;
}

/* Patrón determinista del QR (puro: sin Math.random en render) */
const buildQrCells = (): QrCell[] => {
  const total = QR_GRID_SIZE * QR_GRID_SIZE;
  return Array.from({ length: total }, (_, index) => {
    const row = Math.floor(index / QR_GRID_SIZE);
    const col = index % QR_GRID_SIZE;
    const isFinderSquare =
      (row < 3 && col < 3) ||
      (row < 3 && col >= QR_GRID_SIZE - 3) ||
      (row >= QR_GRID_SIZE - 3 && col < 3);
    return {
      row,
      col,
      isFilled: isFinderSquare || pseudoRandomFraction(row * 31 + col * 17) > 0.52,
    };
  });
};

const QR_CELLS = buildQrCells();

export const QrRevealCard: React.FC = () => {
  /* El QR de ejemplo siempre visible; el clic alterna hacia el regalo */
  const [view, setView] = useState<CardView>('qr');

  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="relative">
        <div className="rounded-3xl border-2 border-pink-300 bg-white p-5 shadow-xl">
          {/* Superficie del QR — visible por defecto */}
          <div aria-hidden="true" className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white p-3">
            <div
              className="grid h-full w-full gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${QR_GRID_SIZE}, 1fr)` }}
            >
              {QR_CELLS.map((cell) => (
                <span
                  key={`${cell.row}-${cell.col}`}
                  className={`aspect-square rounded-[2px] ${cell.isFilled ? 'bg-zafiro' : ''}`}
                />
              ))}
            </div>

            {/* Haz de escaneo rosa */}
            <span
              className="pointer-events-none absolute inset-x-3 h-[12%] rounded-full"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(236,72,153,0), rgba(236,72,153,0.9), rgba(249,168,212,0.95))',
                filter: 'blur(1px)',
                animation: `qr-scan ${SCAN_LOOP_SECONDS}s ease-in-out infinite`,
              }}
            />
          </div>

          {/* Overlay del regalo: rosa, idéntico al sneak peek y al mockup */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-[#FFE4EC] via-[#FECDD3] to-[#FDA4AF] p-6 text-center transition-[clip-path] duration-[900ms] ease-out"
            style={{
              clipPath:
                view === 'gift'
                  ? 'inset(0% 0% 0% 0% round 1.5rem)'
                  : 'inset(46% 46% 46% 46% round 1rem)',
            }}
          >
            <span className="text-4xl">🎀</span>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-pink-700">
              Un mensaje para
            </p>
            <p className="font-heading mt-1 text-2xl font-black text-zafiro">Camila ❤️</p>
            <p className="mt-2 max-w-[220px] text-xs italic leading-relaxed text-pink-900/80">
              Cada momento a tu lado ha sido la mejor historia…
            </p>
            <span className="mt-4 rounded-full bg-pink-600 px-4 py-1.5 text-[11px] font-bold text-white shadow-md">
              📷 Se abre al escanear el código
            </span>
          </div>
        </div>

        {/* Control accesible del toggle */}
        <button
          type="button"
          onClick={() => setView((current) => (current === 'qr' ? 'gift' : 'qr'))}
          aria-pressed={view === 'gift'}
          className="mx-auto mt-4 flex min-h-[44px] items-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-heading text-sm font-bold text-white shadow-lg transition-colors hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
        >
          {view === 'qr' ? '💝 Ver lo que ella recibirá' : '📷 Volver a mi QR'}
        </button>

        <p className="mt-3 text-center text-sm font-semibold text-grafito">
          Del papel a su pantalla en segundos
        </p>
      </div>
    </div>
  );
};

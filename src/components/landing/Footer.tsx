import React from 'react';

const GUARANTEES = [
  { icon: '🔒', label: 'Pago 100% seguro' },
  { icon: '💳', label: 'ePayco / Davivienda' },
  { icon: '↩️', label: 'Garantía de satisfacción' },
  { icon: '⚡', label: 'Entrega inmediata del QR' },
] as const;

/**
 * Pie de página.
 * Sin animaciones: el contenido legal debe ser siempre visible
 * (el bloque inferior quedó invisible en móvil con animate-*).
 */
export const Footer: React.FC = () => {
  return (
    <footer className="bg-noche text-white">
      {/* Insignias de seguridad y garantías */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center sm:grid-cols-4">
        {GUARANTEES.map((guarantee) => (
          <div key={guarantee.label} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{guarantee.icon}</span>
            <span className="text-xs font-bold sm:text-sm">{guarantee.label}</span>
          </div>
        ))}
      </div>

      {/* Bloque legal — alto contraste, sin dependencias de animación */}
      <div className="border-t border-white/10 bg-white/[0.05] px-4 py-8 text-center">
        <p className="font-script text-2xl text-dorado sm:text-3xl">
          Eternal Dedications
        </p>
        <p className="mt-2 text-sm font-semibold text-white sm:text-base">
          © 2026 Eternal Dedications
        </p>
        <p className="mt-1 text-xs text-perla sm:text-sm">
          Todos los derechos reservados.
        </p>
        <p className="mt-3 text-[11px] text-perla/80 sm:text-xs">
          Hecho con ❤️ por ZyvenCore · Validado por ellas
        </p>
      </div>
    </footer>
  );
};

import { useSyncExternalStore } from 'react';

/**
 * Suscripción reactiva a un media query usando la API oficial
 * para stores externos (sin setState dentro de effects).
 */
export const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    (onStoreChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener('change', onStoreChange);
      return () => mediaQueryList.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    /* Snapshot del servidor: nunca coincide en SSR */
    () => false
  );

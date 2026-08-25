import { useMediaQuery } from './useMediaQuery';

export const MOBILE_QUERY = '(max-width: 640px)';

/**
 * true en viewports móviles (<640px).
 * Punto único para las decisiones responsivas de decoración:
 * en móvil las partículas y flores se reducen a la mitad.
 */
export const useIsMobile = (): boolean => useMediaQuery(MOBILE_QUERY);

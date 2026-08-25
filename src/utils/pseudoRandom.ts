/**
 * Fracción pseudoaleatoria determinista en [0, 1).
 *
 * Puramente funcional: la misma semilla produce siempre el mismo valor.
 * Reemplaza a Math.random() durante el render, que es impuro y provoca
 * diferencias entre renders (y fallos de hidratación en SSR).
 */
export const pseudoRandomFraction = (seed: number): number => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

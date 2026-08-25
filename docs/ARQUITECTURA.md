# 🏗️ Arquitectura Técnica — Eternal Dedications

> Documento de referencia para desarrolladores. El [README](../README.md) cubre el qué; este documento, el cómo.

## 1. Mapa del embudo ↔ componentes

La página es un embudo lineal de 8 secciones. Cada una corresponde a un bloque del guion comercial original.

| Orden | Sección | Componente (`components/landing/`) | Rol en el embudo |
|-------|---------|-------------------------------------|------------------|
| 0 | Barra de escasez | `StickyBar` | FOMO persistente |
| — | Marca | `shared/BrandMasthead` | Identidad (caligrafía + shimmer) |
| 1 | Hero | `HeroSection` | Hook: problema + video + CTA |
| 2 | Origen | `OriginSection` | Empatía + sneak peek difuminado |
| 3 | Cómo funciona | `HowItWorksSection` | QR animado + 3 pasos |
| 4 | Live Preview | `LivePreviewSection` | Formulario → mockup 3D en vivo |
| 5 | Validación | `ValidationSection` | Prueba social |
| 6 | Tendencia | `TrendSection` | Escasez con contador flip |
| 7 | Oferta | `OfferSection` | Precio ancla + CTA gigante |

Se componen en orden estricto desde [`App.tsx`](../src/App.tsx).

## 2. Estructura de carpetas

```
src/
├── components/
│   ├── landing/   # Una sección por archivo (embudo vertical)
│   ├── ui/        # Primitivos: PhoneMockup3D, QrRevealCard, decoraciones…
│   └── shared/    # SectionContainer, BrandMasthead
├── hooks/
│   ├── useIsMobile.ts         # <640px — reduce partículas/flores a la mitad
│   ├── useInViewport.ts       # IntersectionObserver genérico (bloom, sneak peek)
│   ├── useMediaQuery.ts       # useSyncExternalStore sobre matchMedia
│   └── useScrollAnimation.ts  # framer-motion useInView
├── utils/pseudoRandom.ts   # PRNG determinista: layout estable sin Math.random()
├── types/index.ts          # FormData del formulario
└── index.css               # Lienzo degradado + 14 keyframes centralizados
```

**Reglas de organización:** `landing/` = embudo · `ui/` = primitivos reutilizables ·
`shared/` = piezas multi-sección. Nada supera las 200 líneas.

## 3. Sistema de color — dos capas

Definido como tokens en [`tailwind.config.js`](../tailwind.config.js).

| Token | Hex | Rol |
|-------|-----|-----|
| `noche` | `#111827` | Superficies de autoridad (barra, validación, footer) |
| `cielo-50/100/200` | azules pálidos | Lienzo frío (degradado del body) |
| `zafiro` / `grafito` | `#0F172A` / `#1E293B` | Tipografía |
| `esmeralda-noche` / `-abismo` | `#047857` / `#065F46` | CTAs (blanco encima ≥4.9:1 AA) |
| `dorado` / `dorado-tinta` | `#D4AF37` / `#7A5C0E` | Decoración / texto dorado legible |
| Rosa del producto | `#FFE4EC → #FDA4AF` | **Solo** dentro de pantallas que muestran el regalo |

**Regla de dos capas:** la tienda usa la paleta fría/dorada (confianza del comprador);
el rosa queda confinado al producto (mockup, sneak peek, reveal). La marca es roja.

## 4. Animaciones

Los keyframes viven centralizados en [`index.css`](../src/index.css):

| Keyframe | Consumidor |
|----------|-----------|
| `fall` / `charm-drift` | FallingPetals / FallingCharms |
| `floatHeart` | FloatingHearts |
| `sparkle` | (paleta de encantos) |
| `shimmer-slide` | Título de marca (banda de luz) |
| `flourish-draw` / `heart-beat` | Masthead (trazo SVG + latido) |
| `bloom-petal` / `flower-sway` | BloomingFlower |
| `qr-scan` | QrRevealCard (haz de escaneo) |
| `flip` | Contador de escasez |
| `pulse-glow` | CTAs y botón del mockup |
| `fadeInUp` / `scaleIn` | Entradas genéricas |

Todos respetan el bloque global `@media (prefers-reduced-motion: reduce)`.

## 5. Componente estrella: PhoneMockup3D

Composición de tres archivos (~350 líneas totales, cada uno con una sola responsabilidad):

```
PhoneMockup3D   → interacción: tilt (mouse/touch), presión, confeti, estado
└── PhoneFrame  → bisel metálico, carcasa, botones laterales, extrusión 3D
    └── GiftScreen → pantalla rosa: island, reflejo, carta, botón "abrir"
```

- **Tilt**: `perspective(800px)` + rotación según posición del puntero (±12°)
- **Confeti**: al abrir, se calcula el centro real del botón y se dispara `react-confetti` desde ahí
- Tras abrir, el botón cambia a *"¡Gracias por confiar en nosotros! ❤️"* y se desactiva

## 6. Accesibilidad y rendimiento

- Contraste WCAG AA auditado token por token (`esmeralda-noche`, `dorado-tinta`, `red-600`…)
- `prefers-reduced-motion`: desactiva todas las animaciones vía media query global
- Targets táctiles ≥44px · `aria-hidden` en todo lo decorativo · `aria-pressed` en toggles
- Partículas con PRNG determinista: sin impurezas de render ni mismatch de hidratación

## 7. Pendientes técnicos

Ver la sección **Roadmap** del [README](../README.md).

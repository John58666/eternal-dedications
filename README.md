# Eternal Dedications ❤️

> Landing de alta conversión para un **regalo digital personalizado con código QR físico**.
> Proyecto de Amor y Amistad 🇨🇴 — él personaliza, paga y ella escanea para recibir su experiencia.

📄 [Ver arquitectura técnica](docs/ARQUITECTURA.md)

## ✨ ¿Qué es?

Eternal Dedications es la landing de venta de una experiencia digital 1-a-1: el novio personaliza nombre, carta y canción; recibe un código QR imprimible; y ella lo escanea el 19 de septiembre para abrir una página inmersiva hecha solo para ella.

Esta landing cubre el **embudo comercial completo**: hook con video, historia de origen, demo interactiva del producto (formulario + mockup 3D en vivo), prueba social, escasez y oferta con precio ancla.

## 🧱 Stack

| Capa | Tecnología |
|------|------------|
| UI | React 19 + TypeScript |
| Build | Vite |
| Estilos | Tailwind CSS v3 (tokens propios en `tailwind.config.js`) |
| Animación | CSS keyframes puros · framer-motion · react-confetti |

## 🚀 Inicio rápido

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | Qué hace |
|--------|----------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila TypeScript + build de producción |
| `npm run lint` | ESLint |
| `npm run preview` | Sirve el build de producción |

## 🗂️ Estructura

```
src/
├── components/
│   ├── landing/    # Secciones del embudo, en orden vertical
│   ├── ui/         # Primitivos reutilizables (mockup 3D, QR, pétalos…)
│   └── shared/     # SectionContainer, BrandMasthead
├── hooks/          # useIsMobile · useInViewport · useMediaQuery · useScrollAnimation
├── utils/          # pseudoRandom (PRNG determinista)
├── types/          # Tipos compartidos
└── index.css       # Keyframes centralizados + lienzo degradado
```

## 🎨 Sistema de diseño — dos capas

| Capa | Colores | Dónde vive |
|------|---------|-----------|
| **Tienda** (confianza del comprador) | Zafiro · Esmeralda · Dorado sobre lienzo cielo-polvo | Barras, CTAs, textos |
| **Producto** (el regalo de ella) | Rosa `#FFE4EC → #FDA4AF` | Mockup 3D, sneak peek, reveal del QR |
| **Marca** | Rojo `#E11D48` con shimmer + corazón latiente | Masthead y firma del footer |

Todos los colores son tokens centralizados en [`tailwind.config.js`](tailwind.config.js).

## 🧠 Decisiones técnicas

- **Mockup 3D con CSS puro**: `perspective` + `preserve-3d` + tilt por mouse/touch — sin three.js
- **Confeti desde el centro físico del botón** (`getBoundingClientRect` → react-confetti)
- **Layout determinista de partículas**: PRNG por semilla (`utils/pseudoRandom`) — cero `Math.random()` durante el render
- **Accesibilidad**: WCAG AA auditado, `prefers-reduced-motion` global, targets táctiles ≥44px
- **Animaciones**: 14 keyframes centralizados en `index.css`, todos referenciados

## 🗺️ Roadmap

- [ ] Checkout real (ePayco / Davivienda) — hoy es placeholder visual
- [ ] Página `/crear` con routing
- [ ] Videos reales 1–6 (hoy placeholders numerados)
- [ ] Plantilla dinámica conectada a base de datos (`/para/CODIGO`)

## 📄 Documentación

- [Arquitectura técnica](docs/ARQUITECTURA.md) — mapa del embudo, hooks, tokens y animaciones

---

Hecho con ❤️ por ZyvenCore — validado por ellas.

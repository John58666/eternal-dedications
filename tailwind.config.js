/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nieve: '#F8FAFC',
        perla: '#F1F5F9',
        /* Superficie neutra de autoridad (barras/validación/footer) */
        noche: '#111827',
        /* Lienzo frío de la página (degradado cielo→blush vive en index.css) */
        cielo: {
          50: '#F0F9FF',
          100: '#EFF6FF',
          200: '#BFDBFE',
        },
        zafiro: '#0F172A',
        grafito: '#1E293B',
        esmeralda: '#10B981',
        /* Base oscura para CTAs: blanco sobre este tono = 3.3:1 (WCAG UI) */
        'esmeralda-dark': '#059669',
        /* Blanco sobre este tono = 4.9:1 — cumple AA para texto normal */
        'esmeralda-noche': '#047857',
        'esmeralda-abismo': '#065F46',
        dorado: '#D4AF37',
        /* Tinta dorada legible sobre fondos claros (contraste 5.5:1) */
        'dorado-tinta': '#7A5C0E',
        'amarillo-palido': '#FDE047',
        'gris-neutro': '#64748B',
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        script: ['Pinyon Script', 'cursive'],
        elegant: ['"Cormorant Garamond"', 'serif'],
        price: ['Bodoni Moda', 'serif'],
      },
    },
  },
  plugins: [],
};

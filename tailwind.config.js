const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const svgToDataUri = require('mini-svg-data-uri');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        roboto: 'var(--font-roboto)',
        poppins: 'var(--font-poppins)',
        openSans: 'var(--font-open-sans)',
        manrope: 'var(--font-manrope)',
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      keyframes: {
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
      backgroundImage: {
        'line-horizontal-dark':
          'linear-gradient(to right, hsla(0, 0%, 100%, 0.2), hsla(0, 0%, 100%, 0.2) 50%, transparent 0, transparent)',
        'line-horizontal-light':
          'linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 50%, transparent 0, transparent)',
        'line-vertical-dark':
          'linear-gradient(to bottom, hsla(0, 0%, 100%, 0.2), hsla(0, 0%, 100%, 0.2) 50%, transparent 0, transparent)',
        'line-vertical-light':
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 50%, transparent 0, transparent)',
      },
      backgroundSize: {
        'line-pattern-horizontal': '5px 1px',
        'line-pattern-vertical': '1px 5px',
      },
      maskImage: {
        'fade-ends': `linear-gradient(to left, #fff 90%, transparent),
                      linear-gradient(to right, #fff 90%, transparent),
                      linear-gradient(#000, #000)`,
      },
      maskComposite: {
        exclude: 'exclude',
      },
      WebkitMaskComposite: {
        exclude: 'exclude',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          'bg-grid-small': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
            )}")`,
          }),
          'bg-dot': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
            )}")`,
          }),
          'bg-diagonal': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M0 0L32 32" />
       <path d="M32 0L0 32" />
     </svg>`,
            )}")`,
          }),
          'bg-dot-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="${value}">
       <circle cx="4" cy="4" r="2"></circle>
       <circle cx="28" cy="4" r="2"></circle>
       <circle cx="4" cy="28" r="2"></circle>
       <circle cx="28" cy="28" r="2"></circle>
     </svg>`,
            )}")`,
          }),
          'bg-zigzag': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M0 16L8 8L16 24L24 8L32 16" />
     </svg>`,
            )}")`,
          }),
          'bg-vertical': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M8 0V32M16 0V32M24 0V32" />
     </svg>`,
            )}")`,
          }),
          'bg-triangle': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M0 32L16 0L32 32H0Z" fill="${value}" />
     </svg>`,
            )}")`,
          }),
          'bg-checkered': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
       <rect width="8" height="8" fill="${value}" />
       <rect x="8" y="8" width="8" height="8" fill="${value}" />
     </svg>`,
            )}")`,
          }),
          'bg-dashed-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M0 0L32 32" stroke-dasharray="4 2" />
       <path d="M32 0L0 32" stroke-dasharray="4 2" />
     </svg>`,
            )}")`,
          }),
          'bg-dashed-diagonal': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}">
       <path d="M0 16L32 0" stroke-dasharray="4 2" />
       <path d="M0 32L32 16" stroke-dasharray="4 2" />
     </svg>`,
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' },
      );
    },
    function ({ addUtilities }) {
      addUtilities({
        '.line-mask-horizontal': {
          '-webkit-mask': `linear-gradient(to left, #fff 90%, transparent),
                           linear-gradient(to right, #fff 90%, transparent),
                           linear-gradient(#000, #000)`,
          '-webkit-mask-composite': 'exclude',
          'mask-composite': 'exclude',
        },
        '.line-mask-vertical': {
          '-webkit-mask': `linear-gradient(to top, #fff 85%, transparent),
                           linear-gradient(to bottom, #fff 85%, transparent),
                           linear-gradient(#000, #000)`,
          '-webkit-mask-composite': 'exclude',
          'mask-composite': 'exclude',
        },
      });
    },
  ],
};

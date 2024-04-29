import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['Open_Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif']
    },
    container: {
      padding: {}
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #191f16 100%)'
      },
      colors: {
        transparent: 'transparent',
        primary: {
          DEFAULT: '#087908',
          100: '#529f52',
          200: '#369336',
          300: '#258725',
          400: '#197f19',
          500: '#087908',
          600: '#516b1b',
          700: '#4b6319',
          800: '#202f08',
          900: '#191f16',
          opacity: '#4b6319ed'
        },
        secondary: {
          DEFAULT: '#8697AA',
          100: '#d5e4f3',
          200: '#aabacb',
          300: '#8697AA',
          400: '#7799bf',
          500: '#6382a5',
          600: '#486585',
          700: '#374155',
          800: '#333B4B',
          900: '#16191c',
          opacity: '#8697aad4'
        },
        borders: {
          DEFAULT: '#333B4B',
          100: '#516b1b',
          600: '#d1d5db',
          900: '#333B4B'
        },
        black: {
          DEFAULT: '#14171a',
          900: '#000000'
        },
        white: {
          DEFAULT: '#FFFFFF',
          opacity: '#ffffffe6'
        },
        error: {
          DEFAULT: '#ff0000'
        }
      },
      maxWidth: {
        min: '320px',
        xs: '480px',
        sm: '720px',
        md: '960px',
        lg: '1200px',
        xl: '1400px',
        xxl: '1600px'
      },
      screens: {
        xxl: '1440px',
        xl: '1200px',
        lg: '960px',
        md: '720px',
        sm: '480px',
        xs: '390px'
      },
      animation: {
        'loop-scroll': 'loop-scroll 35s linear infinite',
        'loop-scroll-2': 'loop-scroll-2 35s linear infinite'
      },
      keyframes: {
        'loop-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' }
        },
        'loop-scroll-2': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0%)' }
        }
      }
    }
  },
  plugins: []
};
export default config;

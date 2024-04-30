import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
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
          DEFAULT: '#3b5998',
          100: '#4078c0',
          200: '#3b5998',
          300: '#336699',
          400: '#2a4d8e',
          500: '#1e3799',
          600: '#194f75',
          700: '#0d5f84',
          800: '#0052cc',
          900: '#003d66',
          opacity: '#3b5998'
        },
        secondary: {
          DEFAULT: '#8AA944',
          100: '#F2F5E9',
          200: '#D8E0BF',
          300: '#BED797',
          400: '#A4C06E',
          500: '#8AA944',
          600: '#708D22',
          700: '#577B1B',
          800: '#3E6816',
          900: '#254512',
          opacity: '#8AA944'
        },
        outline: {
          DEFAULT: '#bdbdbd',
          100: '#bdbdbd',
          600: '#d35400',
          900: '#4CAF50'
        },
        secondaryoutline: {
          DEFAULT: '#424242',
          100: '#424242',
          600: '#d35400',
          900: '#B350AF'
        },
        black: {
          DEFAULT: '#121212',
          100: '111827',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          900: '#000000'
        },
        white: {
          DEFAULT: '#FFFFFF',
          bg: '#F7F9FA',
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9ca3af',
          500: '#6B7280',
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

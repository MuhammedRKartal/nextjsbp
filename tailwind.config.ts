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
          feather: '#529f52',
          lightest: '#369336',
          lighter: '#258725',
          light: '#197f19',
          normal: '#087908',
          dark: '#516b1b',
          darker: '#4b6319',
          darkest: '#202f08',
          black: '#191f16',
          opacity: '#4b6319ed',
          700: '#516b1b',
          800: '#4b6319',
          900: '#191f16'
        },
        secondary: {
          DEFAULT: '#8697AA',
          feather: '#d5e4f3',
          lightest: '#aabacb',
          lighter: '#8697AA',
          light: '#7799bf',
          normal: '#6382a5',
          dark: '#486585',
          darker: '#374155',
          darkest: '#333B4B',
          black: '#16191c',
          opacity: '#8697aad4',
          700: '#374155',
          800: '#333B4B',
          900: '#16191c'
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
      }
    }
  },
  plugins: []
};
export default config;

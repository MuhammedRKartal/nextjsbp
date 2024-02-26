import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Open_Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    container: {
      padding: {

      }
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #191f16 100%)'
      },
      colors: {
        transparent: 'transparent',
        primary: {
          DEFAULT: '#087908',
          700: '#516b1b',
          800: '#4b6319',
          900: '#191f16',
          opacity: '#4b6319ed'
        },
        secondary: {
          DEFAULT: "#8697AA",
          700: '#374155',
          800: '#333B4B',
          900: '#16191c',
        },
        black: {
          DEFAULT:'#14171a',
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
        xxl: '1600px',
      },
      screens: {
        xxl: '1440px',
        xl: '1200px',
        lg: '960px',
        md: '720px',
        sm: '480px'
      }
    }
  },
  plugins: [],
}
export default config

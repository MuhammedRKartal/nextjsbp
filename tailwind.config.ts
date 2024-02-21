import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Open_Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #191f16 100%)'
      },
      colors: {
        transparent: 'transparent',
        primary: {
          100: '#087908',
          700: '#516b1b',
          800: '#4b6319',
          900: '#191f16',
          opacity: '#4b6319ed'
        },
        secondary: {
          100: '#16191c'
        },
        black: {
          400: '#14171a'
        }
      }
    },
  },
  plugins: [],
}
export default config

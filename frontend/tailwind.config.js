/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        card: '#111827',
        border: '#1f2937',
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#38aef9',
          500: '#0e94eb',
          600: '#0276cb',
          700: '#035ea3',
          800: '#075086',
          900: '#0c4370',
          950: '#082b49',
        },
        accent: {
          violet: '#8b5cf6',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(14, 148, 235, 0.15)',
        'glow-accent': '0 0 15px rgba(139, 92, 246, 0.15)',
      }
    },
  },
  plugins: [],
}

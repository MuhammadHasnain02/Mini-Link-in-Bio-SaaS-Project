/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0F172A', // Slate 900
          800: '#1E293B', // Slate 800
          700: '#334155', // Slate 700
          600: '#475569', // Slate 600
        },
        primary: {
          500: '#3B82F6', // Blue 500
          600: '#2563EB', // Blue 600
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

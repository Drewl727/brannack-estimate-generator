/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f1e36',
          light: '#1a2f4e',
          lighter: '#243d62',
        },
        slate: {
          cta: '#0369a1',
          'cta-hover': '#0284c7',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


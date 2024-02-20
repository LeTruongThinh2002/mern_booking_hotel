/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      padding: {
        sm: '5rem',
        md: '15rem',
        lg: '15rem',
        xl: '20rem'
      }
    }
  },
  plugins: []
};

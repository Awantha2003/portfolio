export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#FF5500', dark: '#E04A00' },
        ink: { DEFAULT: '#0B0B0B', soft: '#1C1C1E' },
        lime: '#E4F53B',
        paper: '#F6F7FB',
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
      },
    },
  },
};

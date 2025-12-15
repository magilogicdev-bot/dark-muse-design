/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'Mazzard H', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        brand: ['Mazzard H', 'Manrope', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        'content': '2798px',
      },
      spacing: {
        'figma-padding': '371px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          md: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '576px',
          md: '768px',
          lg: '992px',
          xl: '1200px',
          '2xl': '1400px',
        },
        // Единая стратегия контейнера: max-width для всех секций
        maxWidth: {
          DEFAULT: '100%',
          sm: '576px',
          md: '768px',
          lg: '992px',
          xl: '1200px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}

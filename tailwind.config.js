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
      colors: {
        // Основные цвета проекта
        'primary': '#2A2C38',
        'primary-dark': '#252732',
        'primary-light': '#2B2D31',
        // Акцентные цвета
        'accent-gold': '#c9a86c',
        'accent-green': '#5a8c3a',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'Mazzard H', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        brand: ['Mazzard H', 'Manrope', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        arimo: ['Arimo', 'sans-serif'],
      },
      fontSize: {
        // Адаптивная типографическая система с clamp() - уменьшенные размеры
        'fluid-xs': 'clamp(0.625rem, 0.4vw + 0.4rem, 0.75rem)',      // 10px - 12px
        'fluid-sm': 'clamp(0.75rem, 0.4vw + 0.4rem, 0.875rem)',      // 12px - 14px
        'fluid-base': 'clamp(0.875rem, 0.8vw + 0.4rem, 1.125rem)',   // 14px - 18px
        'fluid-lg': 'clamp(1rem, 0.8vw + 0.4rem, 1.375rem)',         // 16px - 22px
        'fluid-xl': 'clamp(1.125rem, 1.2vw + 0.4rem, 1.5rem)',       // 18px - 24px
        'fluid-2xl': 'clamp(1.25rem, 1.6vw + 0.4rem, 2rem)',         // 20px - 32px
        'fluid-3xl': 'clamp(1.5rem, 2vw + 0.4rem, 2.5rem)',          // 24px - 40px
        'fluid-4xl': 'clamp(1.75rem, 2.4vw + 0.4rem, 3.25rem)',      // 28px - 52px
        'fluid-5xl': 'clamp(2rem, 3.2vw + 0.4rem, 3.75rem)',         // 32px - 60px
        'fluid-6xl': 'clamp(2.5rem, 4vw + 0.4rem, 5rem)',             // 40px - 80px
        'fluid-7xl': 'clamp(3rem, 4.8vw + 0.4rem, 6.25rem)',         // 48px - 100px
        'fluid-8xl': 'clamp(3.5rem, 5.6vw + 0.4rem, 7.5rem)',        // 56px - 120px
        // Заголовки с более агрессивным масштабированием
        'h1': 'clamp(1.75rem, 2vw + 0.4rem, 2.5rem)',                // h1: 28px - 40px
        'h2': 'clamp(1.25rem, 1.6vw + 0.4rem, 2rem)',                // h2: 20px - 32px
        'h3': 'clamp(1.125rem, 1.2vw + 0.4rem, 1.5rem)',            // h3: 18px - 24px
        'h4': 'clamp(1rem, 0.8vw + 0.4rem, 1.375rem)',               // h4: 16px - 22px
        'h5': 'clamp(0.875rem, 0.4vw + 0.4rem, 1.125rem)',          // h5: 14px - 18px
        'h6': 'clamp(0.75rem, 0.4vw + 0.4rem, 0.875rem)',           // h6: 12px - 14px
        // Body текст
        'body': 'clamp(0.875rem, 0.8vw + 0.4rem, 1.125rem)',        // body: 14px - 18px
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

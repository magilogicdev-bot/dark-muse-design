// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-12-11',
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Marck+Script&display=swap'
        }
      ]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  // Disable auto-imports for image components
  imports: {
    autoImport: true
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  // Настройки для статической генерации (SSG)
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false, // Игнорировать ошибки 404 при генерации
      routes: [
        '/',
        '/about',
        '/apartment-selection',
        '/buy-apartment',
        '/contacts',
        '/favorites',
        '/mortgage',
        '/mortgage-guide',
        '/news',
        '/apartment/1',
        '/apartment/2',
        '/apartment/3'
      ]
    }
  }
})

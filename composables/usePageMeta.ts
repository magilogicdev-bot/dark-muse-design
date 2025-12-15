/**
 * Composable для управления мета-тегами страниц
 * Использование в страницах:
 * 
 * usePageMeta({
 *   title: 'Заголовок страницы',
 *   description: 'Описание страницы',
 *   ogImage: '/images/og-image.jpg'
 * })
 */
export const usePageMeta = (meta: {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string
}) => {
  const route = useRoute()
  
  const defaultTitle = 'Pobedonoscev Group'
  const defaultDescription = 'Pobedonoscev Group - строительная компания'
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://победоносцев.рф'

  const title = meta.title 
    ? `${meta.title} | ${defaultTitle}` 
    : defaultTitle

  useHead({
    title,
    meta: [
      {
        name: 'description',
        content: meta.description || defaultDescription
      },
      {
        name: 'keywords',
        content: meta.keywords || ''
      },
      // Open Graph
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: meta.description || defaultDescription
      },
      {
        property: 'og:image',
        content: meta.ogImage ? `${siteUrl}${meta.ogImage}` : `${siteUrl}/images/og-default.jpg`
      },
      {
        property: 'og:url',
        content: `${siteUrl}${route.path}`
      },
      {
        property: 'og:type',
        content: 'website'
      }
    ]
  })
}


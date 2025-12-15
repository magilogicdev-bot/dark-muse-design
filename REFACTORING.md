# Рефакторинг проекта для масштабирования

## Что было сделано

### ✅ 1. Создан composable для меню (`composables/useMenu.ts`)
Переиспользуемая логика открытия/закрытия мобильного меню. Используется в `Header.vue` и `CompactHeader.vue`.

**Использование:**
```vue
<script setup>
import { useMenu } from '~/composables/useMenu'
const { isMenuOpen, toggleMenu, closeMenu } = useMenu()
</script>
```

### ✅ 2. Создан централизованный конфиг (`config/contacts.ts`)
Все контакты, ссылки, навигация и конфигурация вынесены в один файл.

**Что хранится:**
- Телефоны (primary и secondary)
- Время работы
- Социальные сети
- Навигационные ссылки
- Список компаний
- Легальные ссылки (пользовательское соглашение, политика конфиденциальности)
- Брендинг (названия)

**Использование:**
```vue
<script setup>
import { siteConfig } from '~/config/contacts'
const config = siteConfig
// config.contacts.phone.primary
// config.navigation.buyApartment
// и т.д.
</script>
```

### ✅ 3. Обновлен layout (`layouts/default.vue`)
Header и Footer теперь глобально доступны на всех страницах через layout.

**Преимущества:**
- Не нужно дублировать Header/Footer на каждой странице
- Легко добавить новую страницу: просто создайте файл в `pages/`
- Если нужен другой layout (например, без header), создайте `layouts/custom.vue` и используйте его на странице

**Использование другого layout:**
```vue
<!-- pages/special.vue -->
<script setup>
definePageMeta({
  layout: 'custom' // будет использован layouts/custom.vue
})
</script>
```

### ✅ 4. Обновлены компоненты
- `Header.vue` - использует `useMenu` и `siteConfig`
- `CompactHeader.vue` - использует `useMenu` и `siteConfig`
- `Footer.vue` - использует `siteConfig` для всех данных

### ✅ 5. Создан composable для мета-тегов (`composables/usePageMeta.ts`)
Упрощает добавление SEO мета-тегов для страниц.

**Использование:**
```vue
<!-- pages/about.vue -->
<script setup>
usePageMeta({
  title: 'О компании',
  description: 'Информация о компании Pobedonoscev Group',
  ogImage: '/images/og-about.jpg',
  keywords: 'строительство, недвижимость'
})
</script>
```

## Как добавить новую страницу

1. Создайте файл в папке `pages/`:
```vue
<!-- pages/projects.vue -->
<template>
  <div class="bg-[#2a2c38] text-white">
    <BreadcrumbsSection :breadcrumbs="breadcrumbs" />
    <h1>Наши проекты</h1>
    <!-- Ваш контент -->
  </div>
</template>

<script setup>
usePageMeta({
  title: 'Проекты',
  description: 'Посмотрите наши реализованные проекты'
})

const breadcrumbs = [
  { label: 'Главная', url: '/' },
  { label: 'Проекты', url: '/projects' }
]
</script>
```

2. Header и Footer автоматически появятся (благодаря `default.vue` layout)

3. Обновите ссылки в `config/contacts.ts` если нужно

## Структура файлов

```
├── composables/
│   ├── useMenu.ts          # Логика меню
│   └── usePageMeta.ts      # Мета-теги для SEO
├── config/
│   └── contacts.ts         # Централизованная конфигурация
├── layouts/
│   └── default.vue         # Layout с Header и Footer
├── pages/
│   └── index.vue           # Главная страница (обновлена)
└── components/
    ├── Header.vue          # Обновлен для использования composable и config
    ├── CompactHeader.vue   # Обновлен для использования composable и config
    └── Footer.vue          # Обновлен для использования config
```

## Преимущества рефакторинга

1. **Масштабируемость** - легко добавлять новые страницы
2. **Поддерживаемость** - изменения контактов/ссылок в одном месте
3. **Переиспользование** - composables для общей логики
4. **SEO** - удобное управление мета-тегами
5. **Консистентность** - Header/Footer на всех страницах автоматически

## Что изменилось для существующего кода

- ✅ Все изменения обратно совместимы
- ✅ Главная страница работает как раньше
- ✅ Все компоненты сохранили свою функциональность
- ✅ Стили и верстка не изменились

## Следующие шаги (опционально)

1. Организовать компоненты в подпапки:
   - `components/sections/` - секции страниц
   - `components/ui/` - UI компоненты
   - `components/layout/` - Header, Footer

2. Добавить TypeScript типы для конфига (если проект будет на TS)

3. Создать отдельные layouts для разных типов страниц:
   - `layouts/default.vue` - стандартный (Header + Footer)
   - `layouts/minimal.vue` - минимальный (только Footer)
   - `layouts/fullscreen.vue` - без Header/Footer

4. Добавить навигационное меню с данными из конфига


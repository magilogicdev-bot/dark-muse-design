# Pobedonoscev Group - Nuxt 3 Project

Проект реализован на Nuxt 3 + Vue 3 + Tailwind CSS с полной адаптивной резиновой версткой.

## Структура компонентов

Все 38 дизайнов из Figma реализованы как компоненты Vue в папке `components/`:

### Основные компоненты
- **Header.vue** - Основной хедер сайта
- **CompactHeader.vue** - Компактный хедер
- **Footer.vue** - Футер сайта
- **HeroSection.vue** - Главная секция с hero-изображением
- **SocialSidebar.vue** - Боковая панель с социальными сетями

### Секции проектов
- **CurrentProjects.vue** - Текущие проекты
- **CompletedProjects.vue** - Завершенные проекты
- **ProjectsCarousel.vue** - Карусель проектов
- **ProjectDetailHero.vue** - Hero для детальной страницы проекта
- **PropertyFilters.vue** - Фильтры недвижимости
- **PropertySelectionGrid.vue** - Сетка выбора типа недвижимости

### Ипотека
- **MortgageGuideSection.vue** - Гид по ипотеке
- **MortgageCalculatorSection.vue** - Калькулятор ипотеки
- **MortgageFormSection.vue** - Форма ипотеки
- **MortgageGuideFormSection.vue** - Форма гида по ипотеке
- **MortgagePromoSection.vue** - Промо-секция ипотеки
- **MortgageAccordion.vue** - Аккордеон для ипотечных программ

### Формы и контакты
- **CallbackFormSection.vue** - Форма обратного звонка
- **ContactSection.vue** - Секция контактов
- **MapSection.vue** - Секция с картой

### Контентные секции
- **AboutUsSection.vue** - О компании
- **NewsSection.vue** - Секция новостей
- **MediaSection.vue** - Медиа секция
- **LocationSection.vue** - Секция локаций
- **GallerySection.vue** - Галерея
- **VideoSection.vue** - Видео секция

### Дополнительные секции
- **FeaturesSection.vue** - Преимущества
- **TestimonialsSection.vue** - Отзывы клиентов
- **FAQSection.vue** - Часто задаваемые вопросы
- **StatsSection.vue** - Статистика
- **PartnersSection.vue** - Партнеры
- **ProgressSection.vue** - Ход строительства
- **PriceListSection.vue** - Прайс-лист
- **DocumentSection.vue** - Документы
- **ComparisonTableSection.vue** - Таблица сравнения
- **InvestmentSection.vue** - Инвестиционная привлекательность
- **CTAButtonSection.vue** - Призыв к действию
- **BreadcrumbsSection.vue** - Хлебные крошки

## Правила верстки

Все компоненты следуют единым правилам:

1. **Только Tailwind CSS** - никаких inline стилей
2. **Резиновая адаптивная верстка** - mobile-first подход
3. **Единый container** - использование класса `container` с единым max-width
4. **Flexbox/Grid** - для структуры, без absolute positioning (кроме декоративных элементов)
5. **Пропорции из Figma** - сохранение aspect-ratio для изображений
6. **Адаптивные breakpoints** - `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

## Использование изображений

- Контентные изображения: `/assets/` или `/public/images/`
- SVG иконки: `/assets/icons/` или inline в компонентах

## Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Технологии

- **Nuxt 3** - фреймворк
- **Vue 3** - UI фреймворк
- **Tailwind CSS** - стилизация
- **TypeScript** - типизация (опционально)

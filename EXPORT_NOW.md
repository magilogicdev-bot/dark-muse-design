# ⚡ Экспорт иконок - Выполните сейчас

## Компонент готов! ✅

Компонент `FloatingActionBarGold.vue` обновлен и готов использовать иконки из Figma.

## Автоматический экспорт через Node.js

**Выполните в терминале:**

```powershell
# Вариант 1: Установите токен и запустите
$env:FIGMA_TOKEN = "ваш-токен-здесь"
node scripts/download-figma-icons.js

# Вариант 2: Передайте токен напрямую
node scripts/download-figma-icons.js "ваш-токен-здесь"
```

## Получить Figma токен:

1. Откройте https://www.figma.com/settings
2. Прокрутите до "Personal access tokens"
3. Нажмите "Create new token"
4. Скопируйте токен

## Что будет экспортировано:

- ✅ `whatsapp.png` 
- ✅ `telegram.png`
- ✅ `phone-handset.png`
- ✅ `chevron-down.png`

Все файлы сохранятся в `public/images/icons/`

## После экспорта:

Иконки автоматически появятся в компоненте на странице `/favorites`!

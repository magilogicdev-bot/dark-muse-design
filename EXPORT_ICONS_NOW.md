# Экспорт иконок из Figma - Автоматический способ

## ⚡ Быстрый экспорт через Figma API

Скрипт автоматически читает токен из `~/.cursor/mcp.json`.

### Запустите экспорт

```powershell
.\scripts\download-figma-icons-api.ps1
```

Токен должен быть настроен в `~/.cursor/mcp.json`:
```json
{
  "servers": {
    "figma-api": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_TOKEN",
        "--stdio"
      ]
    }
  }
}
```

### Что будет экспортировано:
- ✅ `whatsapp.png` - WhatsApp иконка
- ✅ `telegram.png` - Telegram иконка  
- ✅ `phone-handset.png` - Телефон иконка
- ✅ `chevron-down.png` - Стрелка вниз

Все файлы будут сохранены в `public/images/icons/`

## 🔄 Альтернатива: Ручной экспорт

Если нет токена, экспортируйте вручную:

1. Откройте каждую ссылку в Figma:
   - WhatsApp: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4896&m=dev
   - Telegram: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4897&m=dev
   - Phone: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4895&m=dev
   - Chevron: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4894&m=dev

2. Для каждой иконки:
   - Выберите элемент
   - Правый клик → Export или используйте панель Export
   - Выберите PNG, масштаб 2x или 3x
   - Сохраните с правильным именем в `public/images/icons/`

## ✅ После экспорта

Компонент `FloatingActionBarGold` автоматически отобразит иконки после их добавления в директорию.

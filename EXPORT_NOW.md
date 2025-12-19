# ⚡ Экспорт иконок - Выполните сейчас

## Компонент готов! ✅

Компонент `FloatingActionBarGold.vue` обновлен и готов использовать иконки из Figma.

## Автоматический экспорт через Node.js

**Выполните в терминале:**

```bash
node scripts/download-figma-icons.js
```

Скрипт автоматически читает токен из `~/.cursor/mcp.json`.

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

## Что будет экспортировано:

- ✅ `whatsapp.png` 
- ✅ `telegram.png`
- ✅ `phone-handset.png`
- ✅ `chevron-down.png`

Все файлы сохранятся в `public/images/icons/`

## После экспорта:

Иконки автоматически появятся в компоненте на странице `/favorites`!

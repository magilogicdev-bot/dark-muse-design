# Инструкция по скачиванию изображения White Box Room

## Автоматический способ

Скрипт автоматически читает токен из `~/.cursor/mcp.json`:

```bash
node scripts/download-white-box-room.cjs
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

## Ручной способ (без токена)

1. Откройте Figma Dev Mode:
   https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1090-8387&m=dev

2. Выберите элемент с изображением комнаты

3. Экспортируйте изображение:
   - Правый клик → "Export" или используйте панель Export в правой панели
   - Выберите формат PNG, масштаб 2x или 3x
   - Сохраните файл как `white-box-room.png` в папку `public/images/`

## Проверка

После скачивания файл должен находиться по пути:
`public/images/white-box-room.png`


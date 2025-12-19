# Быстрое скачивание изображений новостей

## Шаг 1: Найдите Node ID для каждого изображения

1. Откройте Figma Dev Mode:
   https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev

2. Для каждого изображения новости:
   - Кликните на изображение в карточке новости
   - Node ID будет виден в URL браузера (после `node-id=`)
   - Или в правой панели Dev Mode в разделе "Selection"

3. Скопируйте 6 node-id (по одному для каждой карточки новости)

## Шаг 2: Обновите скрипт

Откройте `scripts/download-news-images.ps1` и замените `XXXX` на реальные node-id:

```powershell
$nodeIds = @(
    "1038:1234",  # News 1
    "1038:5678",  # News 2
    "1038:9012",  # News 3
    "1038:3456",  # News 4
    "1038:7890",  # News 5
    "1038:2468"   # News 6
)
```

## Шаг 3: Запустите скрипт

```powershell
.\scripts\download-news-images.ps1
```

Скрипт автоматически читает токен из `~/.cursor/mcp.json`.

## Альтернатива: Автоматический поиск

Попробуйте автоматический скрипт (может найти node-id автоматически):

```powershell
.\scripts\download-news-images-auto.ps1
```

Или используйте скрипт для поиска node-id:

```powershell
.\scripts\find-news-node-ids.ps1
```

## Настройка токена

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
4. Скопируйте токен

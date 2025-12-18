# Инструкция по скачиванию изображений новостей

## Быстрый способ (рекомендуется)

Если у вас есть Figma Personal Access Token, просто выполните:

```powershell
.\scripts\download-news-with-token.ps1 -Token "your-figma-token"
```

Скрипт автоматически найдет и скачает все изображения новостей.

## Получение Figma токена

1. Перейдите на https://www.figma.com/settings
2. Прокрутите до раздела "Personal access tokens"
3. Нажмите "Create new token"
4. Скопируйте токен (он показывается только один раз!)

## Альтернативный способ (если автоматический не работает)

Если автоматический поиск не нашел изображения, найдите node-id вручную:

1. Откройте Figma Dev Mode:
   https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev

2. Кликните на каждое изображение новости (всего 6 изображений)

3. Для каждого изображения:
   - Node ID будет в URL браузера после `node-id=`
   - Формат: `1038:XXXX` (например, `1038:1234`)

4. Откройте `scripts/download-news-images.ps1` и замените `XXXX` на реальные node-id:

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

5. Запустите скрипт:

```powershell
$env:FIGMA_TOKEN = "your-token"
.\scripts\download-news-images.ps1
```

## Проверка результата

После скачивания проверьте папку `public/images/news/`. Должны быть файлы:
- `news-1.webp`
- `news-2.webp`
- `news-3.webp`
- `news-4.webp`
- `news-5.webp`
- `news-6.webp`

Страница новостей автоматически использует эти изображения.

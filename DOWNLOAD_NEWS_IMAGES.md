# Инструкция по скачиванию изображений новостей из Figma

## Способ 1: Использование скрипта (рекомендуется)

### Шаг 1: Настройка токена

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

### Шаг 2: Найдите Node ID для каждого изображения

1. Откройте Figma Dev Mode:
   https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev

2. Для каждого изображения новости:
   - Выберите изображение в макете
   - Node ID будет виден в URL или в панели Dev Mode
   - Скопируйте node-id (формат: `1038:XXXX` или `1038-XXXX`)

3. Обновите массив `$nodeIds` в файле `scripts/download-news-images.ps1`:
   ```powershell
   $nodeIds = @(
       "1038:XXXX",  # News 1 - Важное событие для будущих жителей
       "1038:XXXX",  # News 2 - вокруг ЖК «Экогород 2» был убран забор
       "1038:XXXX",  # News 3 - ЖК «Экогород 3» – дом заметно подрос (construction)
       "1038:XXXX",  # News 4 - ЖК «Экогород 3» – дом заметно подрос (exit sign)
       "1038:XXXX",  # News 5 - Building facade
       "1038:XXXX"   # News 6 - Construction site
   )
   ```

### Шаг 3: Запустите скрипт

```powershell
.\scripts\download-news-images.ps1
```

Скрипт автоматически читает токен из `~/.cursor/mcp.json`.

Изображения будут сохранены в `public/images/news/` в формате WebP.

## Способ 2: Ручное скачивание из Figma

1. Откройте Figma Dev Mode:
   https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev

2. Для каждого изображения:
   - Выберите изображение
   - В правой панели найдите раздел "Export"
   - Выберите формат WebP, масштаб 2x
   - Нажмите "Export [название]"
   - Сохраните файл в `public/images/news/` с именами:
     - `news-1.webp` - Важное событие для будущих жителей
     - `news-2.webp` - вокруг ЖК «Экогород 2» был убран забор
     - `news-3.webp` - ЖК «Экогород 3» – дом заметно подрос (construction)
     - `news-4.webp` - ЖК «Экогород 3» – дом заметно подрос (exit sign)
     - `news-5.webp` - Building facade
     - `news-6.webp` - Construction site

## Описание изображений

1. **news-1.webp**: Многоэтажный жилой дом в снежном пейзаже с елями на переднем плане
2. **news-2.webp**: Светлое здание с балконами под голубым небом
3. **news-3.webp**: Стройплощадка с краном и фундаментами
4. **news-4.webp**: Зеленая табличка "ВЫХОД / EXIT" в темном помещении
5. **news-5.webp**: Фасад здания с отражающими окнами
6. **news-6.webp**: Стройплощадка с кирпичными стенами

## Проверка

После скачивания изображений проверьте, что все файлы находятся в `public/images/news/` и имеют правильные имена. Страница новостей автоматически использует эти изображения.

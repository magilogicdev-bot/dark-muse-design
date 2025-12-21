# Figma Image Download Scripts

## Глобальная настройка токена

Токен Figma API должен быть сохранен в `.env` файле для глобального доступа:
```
FIGMA_TOKEN=your-figma-token-here
```

Все скрипты автоматически используют токен из:
1. `.env` файла в корне проекта
2. Переменной окружения `FIGMA_TOKEN`
3. Командной строки (параметр `--token`)
4. `~/.cursor/mcp.json` (если настроен)

## Универсальный скрипт

### `download-figma-images.cjs`

Универсальный скрипт для скачивания любых изображений из Figma.

**Использование:**
```bash
node scripts/download-figma-images.cjs --file <file-key> --nodes <node-id-1,node-id-2> [--output <dir>] [--names <name1,name2>]
```

**Параметры:**
- `--file` - Ключ файла Figma (обязательно)
- `--nodes` - Список Node ID через запятую (обязательно)
- `--output` - Директория для сохранения (по умолчанию: `public/images`)
- `--names` - Имена файлов через запятую (по умолчанию: `figma-{node-id}.png`)
- `--token` - Токен Figma API (опционально, если не в .env)

**Примеры:**

```bash
# Скачать одно изображение
node scripts/download-figma-images.cjs --file PoqoKMYQJFXDIWo8qbsKsj --nodes 1080-7609

# Скачать несколько изображений с именами
node scripts/download-figma-images.cjs \
  --file PoqoKMYQJFXDIWo8qbsKsj \
  --nodes 1080-7609,1080-7690,1080-7689 \
  --output public/images \
  --names main.png,courtyard.png,playground.png

# Скачать с указанием токена
node scripts/download-figma-images.cjs \
  --file PoqoKMYQJFXDIWo8qbsKsj \
  --nodes 1080-7609 \
  --token "your-token-here"
```

## Специализированные скрипты

### `download-ecocity-about-images.cjs`

Скачивает изображения для секции "О ПРОЕКТЕ":
- `ecocity-about-main.png`
- `ecocity-about-courtyard.png`
- `ecocity-about-playground.png`
- `ecocity-about-facade.png`
- `ecocity-about-gallery.png`

**Использование:**
```bash
node scripts/download-ecocity-about-images.cjs
```

Или с токеном:
```bash
node scripts/download-ecocity-about-images.cjs "your-token"
```

## Получение Node ID из Figma

1. Откройте Figma в Dev Mode: `https://www.figma.com/design/{file-key}/...?m=dev`
2. Выберите элемент на холсте
3. Node ID будет в URL: `?node-id=1080-7609`
4. Или скопируйте из панели Dev Mode

## Формат Node ID

Figma использует формат `1080-7609` в URL, но API требует `1080:7609`.
Скрипты автоматически конвертируют формат.

## Текущий токен

Токен должен быть сохранен в `.env` файле (который в `.gitignore`) и используется автоматически всеми скриптами.

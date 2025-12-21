# Ecocity About Section Images

## Описание
Изображения для секции "О ПРОЕКТЕ" жилого комплекса Экогород 3.

## Необходимые изображения

1. **ecocity-about-main.png** - Главное изображение (большое, слева)
   - Node ID: `1080:7609`
   - Описание: Многоэтажное здание с машинами на парковке

2. **ecocity-about-courtyard.png** - Внутренний двор (маленькое, верх-слева)
   - Node ID: `1080:7690`
   - Описание: Внутренний двор жилого комплекса

3. **ecocity-about-playground.png** - Детская площадка (маленькое, верх-справа)
   - Node ID: `1080:7689`
   - Описание: Детская площадка с игровым оборудованием

4. **ecocity-about-facade.png** - Деталь фасада (маленькое, низ-слева)
   - Node ID: `1080:7693`
   - Описание: Деталь фасада здания с кондиционером

5. **ecocity-about-gallery.png** - Галерея (маленькое, низ-справа)
   - Node ID: `1080:7691`
   - Описание: Аэрофото комплекса с оверлеем "ГАЛЕРЕЯ"

## Скачивание через PowerShell

```powershell
.\scripts\download-ecocity-about-images.ps1 -Token "your-figma-token"
```

Или через переменную окружения:
```powershell
$env:FIGMA_TOKEN = "your-figma-token"
.\scripts\download-ecocity-about-images.ps1
```

## Скачивание через Node.js

```bash
node scripts/download-ecocity-about-images.cjs "your-figma-token"
```

## Figma ссылки

- Main: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7609&m=dev
- Courtyard: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7690&m=dev
- Playground: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7689&m=dev
- Facade: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7693&m=dev
- Gallery: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7691&m=dev

## Размещение файлов

Все изображения должны быть размещены в:
```
public/images/
```

После скачивания файлы должны иметь следующие имена:
- `ecocity-about-main.png`
- `ecocity-about-courtyard.png`
- `ecocity-about-playground.png`
- `ecocity-about-facade.png`
- `ecocity-about-gallery.png`


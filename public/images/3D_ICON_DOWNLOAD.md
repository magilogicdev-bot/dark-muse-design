# Скачивание 3D иконки из Figma

## Текущая ситуация

Компонент `EcocityHeroSection.vue` использует иконку `/images/3d-icon-button.png`.

## Способ 1: Автоматическое скачивание (если токен настроен)

```powershell
.\scripts\download-ecocity-3d-icon.ps1
```

Скрипт автоматически читает токен из `~/.cursor/mcp.json`.

## Способ 2: Ручное скачивание из Figma

1. **Откройте Figma Dev Mode:**
   ```
   https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1080-7738&m=dev
   ```

2. **Экспортируйте иконку:**
   - Элемент должен быть автоматически выбран
   - В правой панели нажмите **Export** или кликните правой кнопкой → **Export**
   - Выберите формат: **PNG**
   - Масштаб: **2x** или **3x** (для retina-дисплеев)
   - Сохраните как: `3d-icon-button.png`

3. **Сохраните файл:**
   - Путь: `public/images/3d-icon-button.png`
   - Замените существующий файл (если он есть)

## Проверка

После скачивания проверьте:
```powershell
Get-Item public\images\3d-icon-button.png
```

Компонент автоматически использует обновлённую иконку.

## Node ID

- **Figma File Key:** `PoqoKMYQJFXDIWo8qbsKsj`
- **Node ID:** `1080:7738` (или `1080-7738` в URL)












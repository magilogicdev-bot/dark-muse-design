# Инструкция по конвертации изображений в WebP

Все ссылки на изображения в компонентах уже обновлены на формат `.webp`. Теперь нужно конвертировать сами изображения.

**⚠️ ВАЖНО:** Если npm registry заблокирован (ошибка 403), используйте онлайн-конвертеры или альтернативные методы ниже.

## Способ 1: PowerShell скрипт (рекомендуется для Windows)

Если у вас установлены Google WebP Tools (cwebp), используйте PowerShell скрипт:

```powershell
npm run convert-images:ps1
```

Или напрямую:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/convert-to-webp.ps1
```

Скрипт автоматически:
- Проверит наличие cwebp в системе
- Найдет все PNG и JPG файлы в папках `public/images` и `assets`
- Конвертирует их в WebP с качеством 85%
- Покажет список файлов, если cwebp не установлен

**Установка cwebp:**
1. Скачайте WebP tools: https://developers.google.com/speed/webp/download
2. Распакуйте и добавьте в PATH, или поместите в папку проекта

## Способ 1.1: Node.js скрипт (требует установки sharp)

**Примечание:** Если npm блокирует установку пакетов (ошибка 403), используйте другие способы.

1. Установите `sharp`:
```bash
npm install --save-dev sharp
```

2. Запустите скрипт конвертации:
```bash
npm run convert-images
```

Скрипт автоматически найдет все PNG и JPG файлы в папках `public/images` и `assets` и конвертирует их в WebP с качеством 85%.

## Способ 2: Онлайн-конвертеры (РЕКОМЕНДУЕТСЯ при блокировке npm)

Если установка npm пакетов недоступна (ошибка 403), используйте онлайн-конвертеры:

1. **Squoosh** (рекомендуется): https://squoosh.app/
   - Загрузите изображение
   - Выберите формат WebP
   - Установите качество 85%
   - Скачайте и замените оригинальный файл

2. **CloudConvert**: https://cloudconvert.com/png-to-webp
   - Загрузите изображения
   - Выберите качество 85%
   - Скачайте и замените файлы

## Способ 3: Использование командной строки (если установлен cwebp)

Если у вас установлены Google WebP Tools:

```bash
# Для одного файла
cwebp -q 85 input.png -o output.webp

# Для всех PNG в папке (Windows PowerShell)
Get-ChildItem -Path "public\images\*.png" | ForEach-Object {
    cwebp -q 85 $_.FullName -o ($_.FullName -replace '\.png$', '.webp')
}

# Для всех JPG в папке
Get-ChildItem -Path "public\images\*.jpg" | ForEach-Object {
    cwebp -q 85 $_.FullName -o ($_.FullName -replace '\.jpg$', '.webp')
}
```

## Что нужно конвертировать

### Папка `public/images/`
- Все PNG файлы (около 65 файлов)
- `hero-aerial.jpg` → `hero-aerial.webp`
- `hero-bg.png` → `hero-bg.webp`

### Папка `assets/`
- Все PNG файлы (если они используются в проекте)

## Важно

- После конвертации оригинальные PNG/JPG файлы можно удалить для экономии места
- WebP файлы будут иметь те же имена, но с расширением `.webp`
- Все ссылки в компонентах уже обновлены на `.webp`

## Проверка

После конвертации убедитесь, что:
1. Все WebP файлы созданы
2. Сайт корректно отображает изображения
3. Размер файлов уменьшился (WebP обычно на 25-35% меньше PNG)


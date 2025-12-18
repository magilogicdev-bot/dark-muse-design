# Инструкция по скачиванию иконок из Figma

## Быстрый способ (с Figma токеном)

### Вариант 1: Node.js скрипт

```bash
# Установите токен Figma
$env:FIGMA_TOKEN = "your-figma-token"

# Запустите скрипт
node scripts/download-figma-icons.js
```

### Вариант 2: PowerShell скрипт

```powershell
# Установите токен Figma
$env:FIGMA_TOKEN = "your-figma-token"

# Запустите скрипт
.\scripts\download-figma-icons-api.ps1
```

Или передайте токен как параметр:
```powershell
.\scripts\download-figma-icons-api.ps1 -Token "your-figma-token"
```

## Как получить Figma токен

1. Перейдите на https://www.figma.com/settings
2. Прокрутите до раздела "Personal access tokens"
3. Нажмите "Create a new token"
4. Скопируйте токен и используйте его в скриптах выше

## Ручной способ (без токена)

Если у вас нет токена, вы можете скачать иконки вручную:

1. Откройте Figma файл: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15

2. Для каждой иконки:
   - Перейдите по ссылке ниже
   - Выберите элемент
   - Правый клик → "Export" или используйте панель Export в правой панели
   - Выберите формат PNG, масштаб 2x или 3x
   - Сохраните файл с указанным именем

### Ссылки на иконки:

1. **Phone (phone-handset.png)**
   - URL: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4895&m=dev
   - Сохранить как: `public/images/icons/phone-handset.png`

2. **Telegram (telegram.png)**
   - URL: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4897&m=dev
   - Сохранить как: `public/images/icons/telegram.png`

3. **WhatsApp (whatsapp.png)**
   - URL: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4896&m=dev
   - Сохранить как: `public/images/icons/whatsapp.png`

4. **Chevron Down (chevron-down.png)**
   - URL: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4894&m=dev
   - Сохранить как: `public/images/icons/chevron-down.png`

## Проверка

После скачивания проверьте, что все файлы на месте:

```powershell
Get-ChildItem public\images\icons\*.png
```

Должны быть файлы:
- `phone-handset.png`
- `telegram.png`
- `whatsapp.png`
- `chevron-down.png`

## Важно

- Иконки уже содержат фон и границы, поэтому компонент обновлён и не добавляет дополнительные стили
- Используйте масштаб 2x или 3x при экспорте для лучшего качества на retina-экранах
- Формат должен быть PNG для сохранения прозрачности и текстуры







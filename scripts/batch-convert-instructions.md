# Инструкция по пакетной конвертации изображений

Поскольку npm registry заблокирован, используйте один из следующих методов:

## Метод 1: Squoosh CLI (рекомендуется)

Squoosh имеет CLI версию, которая не требует npm:

1. Скачайте Squoosh CLI: https://github.com/GoogleChromeLabs/squoosh/releases
2. Или используйте онлайн версию: https://squoosh.app/

### Онлайн Squoosh (проще всего):
1. Откройте https://squoosh.app/
2. Перетащите папку `public/images` в браузер
3. Выберите формат WebP, качество 85%
4. Скачайте все файлы
5. Замените оригинальные файлы

## Метод 2: CloudConvert API (если есть API ключ)

Или используйте онлайн: https://cloudconvert.com/png-to-webp

## Метод 3: Python скрипт (если установлен Python)

Создайте файл `convert_webp.py`:

```python
from PIL import Image
import os
import glob

def convert_to_webp(input_path, output_path, quality=85):
    try:
        img = Image.open(input_path)
        img.save(output_path, 'WEBP', quality=quality)
        print(f"Converted: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
        return True
    except Exception as e:
        print(f"Error converting {input_path}: {e}")
        return False

# Convert images in public/images
for ext in ['*.png', '*.jpg', '*.jpeg']:
    for img_path in glob.glob(f'public/images/{ext}'):
        webp_path = img_path.rsplit('.', 1)[0] + '.webp'
        if not os.path.exists(webp_path):
            convert_to_webp(img_path, webp_path)

# Convert images in assets
for ext in ['*.png', '*.jpg', '*.jpeg']:
    for img_path in glob.glob(f'assets/{ext}'):
        webp_path = img_path.rsplit('.', 1)[0] + '.webp'
        if not os.path.exists(webp_path):
            convert_to_webp(img_path, webp_path)
```

Установите Pillow: `pip install Pillow`
Запустите: `python convert_webp.py`

## Метод 4: Использование Google WebP Tools

1. Скачайте: https://developers.google.com/speed/webp/download
2. Распакуйте в папку проекта
3. Используйте PowerShell скрипт (он уже создан)

## Быстрый способ - онлайн конвертеры

Для быстрой конвертации всех файлов:

1. **Squoosh.app** - лучший вариант, поддерживает пакетную обработку
2. **CloudConvert** - можно загрузить несколько файлов
3. **Convertio** - https://convertio.co/png-webp/

## Важно

После конвертации убедитесь, что:
- Все WebP файлы созданы с теми же именами (только расширение .webp)
- Оригинальные PNG/JPG можно удалить для экономии места
- Все ссылки в компонентах уже обновлены на .webp


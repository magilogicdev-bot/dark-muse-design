import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Проверяем, установлен ли sharp
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (e) {
  console.error('❌ Sharp не установлен. Установите его командой: npm install --save-dev sharp');
  console.error('Или используйте другой инструмент для конвертации изображений в WebP.');
  process.exit(1);
}

// Функция для рекурсивного поиска файлов
function findImages(dir, extensions = ['.png', '.jpg', '.jpeg']) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      files.push(...findImages(fullPath, extensions));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (extensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// Функция конвертации изображения
async function convertToWebP(inputPath) {
  try {
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    // Пропускаем, если WebP уже существует
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Пропущено (уже существует): ${path.basename(outputPath)}`);
      return;
    }

    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✅ Конвертировано: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Ошибка при конвертации ${inputPath}:`, error.message);
  }
}

// Основная функция
async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicImagesDir = path.join(projectRoot, 'public', 'images');
  const assetsDir = path.join(projectRoot, 'assets');

  console.log('🔄 Начинаю конвертацию изображений в WebP...\n');

  const directories = [publicImagesDir, assetsDir].filter(dir => fs.existsSync(dir));

  if (directories.length === 0) {
    console.error('❌ Не найдены директории с изображениями');
    return;
  }

  let totalConverted = 0;
  let totalSkipped = 0;

  for (const dir of directories) {
    console.log(`📁 Обработка директории: ${path.relative(projectRoot, dir)}`);
    const images = findImages(dir);

    if (images.length === 0) {
      console.log('   (нет изображений для конвертации)\n');
      continue;
    }

    for (const imagePath of images) {
      const outputPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      if (fs.existsSync(outputPath)) {
        totalSkipped++;
      } else {
        await convertToWebP(imagePath);
        totalConverted++;
      }
    }
    console.log('');
  }

  console.log(`\n✨ Готово! Конвертировано: ${totalConverted}, пропущено: ${totalSkipped}`);
  console.log('\n📝 Не забудьте обновить ссылки на изображения в компонентах!');
}

main().catch(console.error);


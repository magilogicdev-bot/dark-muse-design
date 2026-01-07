const fs = require('fs');
const path = require('path');

const sourceDir = 'C:/Users/neiro/Downloads/flat/flat';
const targetDir = 'public/images/apartments';

// Создаём целевую директорию
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Копируем изображения для каждой квартиры
for (let i = 1; i <= 224; i++) {
    const sourceFolder = path.join(sourceDir, String(i));
    const targetFolder = path.join(targetDir, String(i));

    if (fs.existsSync(sourceFolder)) {
        // Создаём папку для квартиры
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }

        // Копируем нужные файлы
        const filesToCopy = ['furniture.webp', 'picture.webp', 'dimentions.webp'];

        for (const file of filesToCopy) {
            const sourcePath = path.join(sourceFolder, file);
            const targetPath = path.join(targetFolder, file);

            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }

        console.log(`Скопировано: квартира ${i}`);
    }
}

console.log('Готово! Все изображения скопированы.');

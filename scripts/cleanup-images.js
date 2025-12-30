import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findImages(dir, extensions = ['.png', '.jpg', '.jpeg']) {
    const files = [];
    if (!fs.existsSync(dir)) return [];
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

async function main() {
    const projectRoot = path.resolve(__dirname, '..');
    const publicImagesDir = path.join(projectRoot, 'public', 'images');
    const assetsDir = path.join(projectRoot, 'assets');

    console.log('🗑️  Starting cleanup of original images...\n');

    const directories = [publicImagesDir, assetsDir];
    let totalDeleted = 0;
    let totalSpaceSaved = 0;

    for (const dir of directories) {
        console.log(`Checking directory: ${dir}`);
        const images = findImages(dir);

        for (const imagePath of images) {
            const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

            if (fs.existsSync(webpPath)) {
                // Safe to delete
                try {
                    const stats = fs.statSync(imagePath);
                    const size = stats.size;
                    fs.unlinkSync(imagePath);
                    console.log(`Deleted: ${path.basename(imagePath)} (-${(size / 1024 / 1024).toFixed(2)} MB)`);
                    totalDeleted++;
                    totalSpaceSaved += size;
                } catch (err) {
                    console.error(`Failed to delete ${imagePath}:`, err);
                }
            } else {
                console.log(`Skipping (no WebP found): ${path.basename(imagePath)}`);
            }
        }
    }

    console.log(`\n✨ Cleanup complete!`);
    console.log(`Deleted files: ${totalDeleted}`);
    console.log(`Space saved: ${(totalSpaceSaved / 1024 / 1024).toFixed(2)} MB`);
}

main();

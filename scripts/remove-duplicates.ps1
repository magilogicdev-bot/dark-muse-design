# Скрипт для удаления дубликатов файлов в public/images
# Оставляет один экземпляр файла из каждой группы дубликатов

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imagesDir = Join-Path $projectRoot "public\images"

if (-not (Test-Path $imagesDir)) {
    Write-Host "❌ Папка images не найдена: $imagesDir" -ForegroundColor Red
    exit 1
}

Write-Host "🔍 Поиск дубликатов в $imagesDir..." -ForegroundColor Cyan
Write-Host ""

# Получаем все файлы и их хеши
$allFiles = Get-ChildItem -Path $imagesDir -Recurse -File
Write-Host "Всего файлов: $($allFiles.Count)" -ForegroundColor White

# Группируем по хешу
$fileHashes = $allFiles | Get-FileHash
$duplicateGroups = $fileHashes | Group-Object Hash | Where-Object { $_.Count -gt 1 }

Write-Host "Найдено групп дубликатов: $($duplicateGroups.Count)" -ForegroundColor Yellow
Write-Host ""

if ($duplicateGroups.Count -eq 0) {
    Write-Host "✅ Дубликаты не найдены!" -ForegroundColor Green
    exit 0
}

# Подсчитываем статистику
$totalDuplicates = 0
$totalSizeToFree = 0
$filesToDelete = @()

foreach ($group in $duplicateGroups) {
    $files = $group.Group | ForEach-Object { 
        $fileInfo = Get-Item $_.Path
        [PSCustomObject]@{
            Path = $_.Path
            RelativePath = $_.Path.Replace((Get-Location).Path + '\public\images\', '')
            Size = $fileInfo.Length
        }
    }
    
    # Сортируем файлы: приоритет корневой папке images, затем по длине пути (короче = приоритетнее)
    $sortedFiles = $files | Sort-Object { 
        if ($_.RelativePath -notlike '*\*') { 0 } else { 1 }
    }, { $_.RelativePath.Length }
    
    # Первый файл оставляем, остальные удаляем
    $keepFile = $sortedFiles[0]
    $deleteFiles = $sortedFiles[1..($sortedFiles.Count - 1)]
    
    foreach ($deleteFile in $deleteFiles) {
        $filesToDelete += [PSCustomObject]@{
            Path = $deleteFile.Path
            RelativePath = $deleteFile.RelativePath
            Size = $deleteFile.Size
            KeepFile = $keepFile.RelativePath
        }
        $totalSizeToFree += $deleteFile.Size
        $totalDuplicates++
    }
}

Write-Host "=== ПЛАН УДАЛЕНИЯ ===" -ForegroundColor Cyan
Write-Host "Файлов к удалению: $totalDuplicates" -ForegroundColor Yellow
Write-Host "Будет освобождено: $([math]::Round($totalSizeToFree / 1MB, 2)) MB" -ForegroundColor Yellow
Write-Host ""

# Показываем топ-20 самых больших файлов к удалению
Write-Host "Топ-20 самых больших файлов к удалению:" -ForegroundColor White
$filesToDelete | Sort-Object Size -Descending | Select-Object -First 20 | ForEach-Object {
    Write-Host "  - $($_.RelativePath) ($([math]::Round($_.Size / 1MB, 2)) MB) -> оставляем: $($_.KeepFile)" -ForegroundColor Gray
}

Write-Host ""
$confirmation = Read-Host "Продолжить удаление? (y/N)"

if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "Отменено пользователем" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🗑️  Удаление дубликатов..." -ForegroundColor Cyan

$deleted = 0
$freed = 0
$errors = 0

foreach ($file in $filesToDelete) {
    try {
        Remove-Item -Path $file.Path -Force -ErrorAction Stop
        $deleted++
        $freed += $file.Size
        Write-Host "  ✓ Удален: $($file.RelativePath)" -ForegroundColor Green
    } catch {
        $errors++
        Write-Host "  ✗ Ошибка при удалении $($file.RelativePath): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== РЕЗУЛЬТАТ ===" -ForegroundColor Green
Write-Host "Удалено файлов: $deleted из $totalDuplicates" -ForegroundColor White
Write-Host "Освобождено места: $([math]::Round($freed / 1MB, 2)) MB" -ForegroundColor White
if ($errors -gt 0) {
    Write-Host "Ошибок: $errors" -ForegroundColor Red
}

# Финальная статистика
$finalFiles = Get-ChildItem -Path $imagesDir -Recurse -File
$finalSize = ($finalFiles | Measure-Object -Property Length -Sum).Sum

Write-Host ""
Write-Host "Финальная статистика:" -ForegroundColor Cyan
Write-Host "  Файлов: $($finalFiles.Count) (было: $($allFiles.Count))" -ForegroundColor White
Write-Host "  Размер: $([math]::Round($finalSize / 1MB, 2)) MB" -ForegroundColor White

Write-Host ""
Write-Host "✅ Готово!" -ForegroundColor Green




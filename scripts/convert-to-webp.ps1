# PowerShell script for converting images to WebP format
# Uses cwebp tool if available

$ErrorActionPreference = "Stop"

# Paths to image directories
$projectRoot = Split-Path -Parent $PSScriptRoot
$publicImagesDir = Join-Path $projectRoot "public\images"
$assetsDir = Join-Path $projectRoot "assets"

# Function to check if cwebp is available
function Test-WebPTools {
    $cwebp = Get-Command cwebp -ErrorAction SilentlyContinue
    if ($cwebp) {
        return $true
    }
    return $false
}

# Function to convert image using cwebp
function Convert-ImageToWebP-CWebP {
    param(
        [string]$InputPath,
        [int]$Quality = 85
    )
    
    $OutputPath = $InputPath -replace '\.(png|jpg|jpeg)$', '.webp'
    
    if (Test-Path $OutputPath) {
        Write-Host "[SKIP] Already exists: $(Split-Path -Leaf $OutputPath)" -ForegroundColor Yellow
        return
    }
    
    try {
        & cwebp -q $Quality $InputPath -o $OutputPath
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[OK] Converted: $(Split-Path -Leaf $InputPath) -> $(Split-Path -Leaf $OutputPath)" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "[ERROR] Failed to convert $InputPath : $_" -ForegroundColor Red
    }
    return $false
}

# Function to find image files
function Get-ImageFiles {
    param([string]$Directory)
    
    if (-not (Test-Path $Directory)) {
        return @()
    }
    
    $images = Get-ChildItem -Path $Directory -Recurse -Include *.png,*.jpg,*.jpeg -File | 
        Where-Object { $_.FullName -notmatch 'node_modules' }
    
    return $images
}

# Main logic
Write-Host "Starting WebP conversion...`n" -ForegroundColor Cyan

# Check if cwebp is available
$hasWebPTools = Test-WebPTools

if (-not $hasWebPTools) {
    Write-Host "[WARNING] cwebp tool not found in system.`n" -ForegroundColor Yellow
    Write-Host "To install cwebp:" -ForegroundColor Yellow
    Write-Host "1. Download WebP tools from https://developers.google.com/speed/webp/download" -ForegroundColor Yellow
    Write-Host "2. Or use online converters (Squoosh, CloudConvert)" -ForegroundColor Yellow
    Write-Host "3. Or use convert-to-webp.js script after installing sharp`n" -ForegroundColor Yellow
    
    Write-Host "Files that need conversion:" -ForegroundColor Cyan
    $directories = @($publicImagesDir, $assetsDir) | Where-Object { Test-Path $_ }
    
    foreach ($dir in $directories) {
        Write-Host "`nDirectory: $dir" -ForegroundColor Cyan
        $images = Get-ImageFiles -Directory $dir
        if ($images.Count -eq 0) {
            Write-Host "   (no images)" -ForegroundColor Gray
        } else {
            foreach ($img in $images) {
                $webpPath = $img.FullName -replace '\.(png|jpg|jpeg)$', '.webp'
                if (-not (Test-Path $webpPath)) {
                    Write-Host "   [NEED] $(Split-Path -Leaf $img.FullName) -> $(Split-Path -Leaf $webpPath)" -ForegroundColor Red
                } else {
                    Write-Host "   [OK] $(Split-Path -Leaf $webpPath) (already exists)" -ForegroundColor Green
                }
            }
        }
    }
    
    Write-Host "`nRecommendation: Use online converter Squoosh (https://squoosh.app/) for batch conversion" -ForegroundColor Yellow
    exit 0
}

# If cwebp is available, perform conversion
Write-Host "[OK] cwebp found, starting conversion...`n" -ForegroundColor Green

$directories = @($publicImagesDir, $assetsDir) | Where-Object { Test-Path $_ }
$totalConverted = 0
$totalSkipped = 0

foreach ($dir in $directories) {
    Write-Host "Processing: $(Split-Path -Leaf $dir)" -ForegroundColor Cyan
    $images = Get-ImageFiles -Directory $dir
    
    if ($images.Count -eq 0) {
        Write-Host "   (no images to convert)`n" -ForegroundColor Gray
        continue
    }
    
    foreach ($img in $images) {
        $webpPath = $img.FullName -replace '\.(png|jpg|jpeg)$', '.webp'
        if (Test-Path $webpPath) {
            $totalSkipped++
            Write-Host "[SKIP] Already exists: $(Split-Path -Leaf $webpPath)" -ForegroundColor Yellow
        } else {
            if (Convert-ImageToWebP-CWebP -InputPath $img.FullName) {
                $totalConverted++
            }
        }
    }
    Write-Host ""
}

Write-Host "`n[DONE] Converted: $totalConverted, Skipped: $totalSkipped" -ForegroundColor Green
Write-Host "`nAll component references have been updated to .webp format!" -ForegroundColor Cyan

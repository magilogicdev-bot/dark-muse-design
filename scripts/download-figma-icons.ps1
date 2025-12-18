# PowerShell script to download Figma icons
# Usage: .\scripts\download-figma-icons.ps1

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $projectRoot "public\images\icons"

# Ensure icons directory exists
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
}

# Figma file key and node IDs
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeIds = @(
    "1054:4895",  # Phone
    "1054:4897",  # Telegram
    "1054:4896",  # WhatsApp
    "1054:4894"   # Chevron Down
)

$iconNames = @(
    "phone-handset",
    "telegram",
    "whatsapp",
    "chevron-down"
)

Write-Host "📥 Downloading Figma icons..." -ForegroundColor Cyan
Write-Host "⚠️  Note: This script requires Figma export URLs." -ForegroundColor Yellow
Write-Host "   Please export the icons from Figma manually or use Figma API." -ForegroundColor Yellow
Write-Host ""

# Function to download image from URL
function Download-Image {
    param(
        [string]$Url,
        [string]$OutputPath
    )
    
    try {
        Write-Host "Downloading: $OutputPath" -ForegroundColor Green
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath -UseBasicParsing
        Write-Host "✓ Saved: $OutputPath" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "✗ Failed to download: $_" -ForegroundColor Red
        return $false
    }
}

# Instructions for manual download
Write-Host "To download icons from Figma:" -ForegroundColor Yellow
Write-Host "1. Open Figma: https://www.figma.com/design/$fileKey/ALFA-12.15" -ForegroundColor White
for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    $nodeId = $nodeIds[$i]
    $iconName = $iconNames[$i]
    Write-Host "2. Export node $nodeId as PNG (2x or 3x) and save as: $iconName.png" -ForegroundColor White
    Write-Host "   URL: https://www.figma.com/design/$fileKey/ALFA-12.15?node-id=$($nodeId -replace ':', '-')" -ForegroundColor Gray
}
Write-Host ""
Write-Host "3. Place the exported PNG files in: $iconsDir" -ForegroundColor White
Write-Host ""

# Check if files already exist
$allExist = $true
for ($i = 0; $i -lt $iconNames.Length; $i++) {
    $iconName = $iconNames[$i]
    $iconPath = Join-Path $iconsDir "$iconName.png"
    if (-not (Test-Path $iconPath)) {
        Write-Host "⚠️  Missing: $iconName.png" -ForegroundColor Yellow
        $allExist = $false
    } else {
        Write-Host "✓ Found: $iconName.png" -ForegroundColor Green
    }
}

if ($allExist) {
    Write-Host ""
    Write-Host "✨ All icons are present!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "📝 Please download the missing icons from Figma." -ForegroundColor Yellow
}






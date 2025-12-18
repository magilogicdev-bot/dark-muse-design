# Direct export script for Figma icons
# This script will attempt to export icons using Figma API

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Continue"

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $projectRoot "public\images\icons"

# Ensure icons directory exists
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
    Write-Host "✓ Created icons directory" -ForegroundColor Green
}

$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeIds = @("1054:4895", "1054:4897", "1054:4896", "1054:4894")
$iconNames = @("phone-handset", "telegram", "whatsapp", "chevron-down")

if (-not $Token) {
    Write-Host "⚠️  Figma token required for API export" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide token:" -ForegroundColor Cyan
    Write-Host "  .\scripts\export-icons-direct.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Or set environment variable:" -ForegroundColor Cyan
    Write-Host "  `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host "  .\scripts\export-icons-direct.ps1" -ForegroundColor White
    exit 1
}

Write-Host "📥 Exporting icons from Figma..." -ForegroundColor Cyan

$nodeIdsString = $nodeIds -join ","
$apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=png&scale=3"

$headers = @{
    "X-Figma-Token" = $Token
}

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "✓ Got export URLs" -ForegroundColor Green
        
        for ($i = 0; $i -lt $nodeIds.Length; $i++) {
            $nodeId = $nodeIds[$i]
            $iconName = $iconNames[$i]
            $iconPath = Join-Path $iconsDir "$iconName.png"
            
            if ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "Downloading $iconName..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $iconPath -UseBasicParsing
                    Write-Host "✓ Saved: $iconName.png" -ForegroundColor Green
                }
                catch {
                    Write-Host "✗ Error: $_" -ForegroundColor Red
                }
            }
        }
        
        Write-Host ""
        Write-Host "✨ Export complete!" -ForegroundColor Green
    }
    else {
        Write-Host "❌ No images in response" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ API error: $_" -ForegroundColor Red
    exit 1
}

# Auto-export Figma icons script
# This script will export icons if FIGMA_TOKEN is available

$ErrorActionPreference = "Continue"

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $projectRoot "public\images\icons"

if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
}

$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeIds = @("1054:4895", "1054:4897", "1054:4896", "1054:4894")
$iconNames = @("phone-handset", "telegram", "whatsapp", "chevron-down")

$Token = $env:FIGMA_TOKEN

if (-not $Token) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  FIGMA TOKEN REQUIRED FOR AUTO-EXPORT" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To export icons automatically, please provide Figma token:" -ForegroundColor White
    Write-Host ""
    Write-Host "  1. Get token from: https://www.figma.com/settings" -ForegroundColor Gray
    Write-Host "  2. Run: `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor Gray
    Write-Host "  3. Run this script again" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Or run with token:" -ForegroundColor White
    Write-Host "  .\scripts\auto-export-icons.ps1 -Token 'your-token'" -ForegroundColor Cyan
    Write-Host ""
    exit 0
}

param(
    [string]$Token = $env:FIGMA_TOKEN
)

Write-Host "📥 Exporting icons from Figma..." -ForegroundColor Cyan
Write-Host ""

$nodeIdsString = $nodeIds -join ","
$apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$nodeIdsString" + "&format=png" + "&scale=3"

$headers = @{
    "X-Figma-Token" = $Token
}

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "✓ Got export URLs" -ForegroundColor Green
        Write-Host ""
        
        $successCount = 0
        for ($i = 0; $i -lt $nodeIds.Length; $i++) {
            $nodeId = $nodeIds[$i]
            $iconName = $iconNames[$i]
            $iconPath = Join-Path $iconsDir "$iconName.png"
            
            if ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "  Downloading $iconName..." -ForegroundColor Yellow -NoNewline
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $iconPath -UseBasicParsing | Out-Null
                    Write-Host " ✓" -ForegroundColor Green
                    $successCount++
                }
                catch {
                    Write-Host " ✗" -ForegroundColor Red
                    Write-Host "    Error: $_" -ForegroundColor Red
                }
            }
        }
        
        Write-Host ""
        if ($successCount -eq $nodeIds.Length) {
            Write-Host "✨ All icons exported successfully!" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  Exported $successCount of $($nodeIds.Length) icons" -ForegroundColor Yellow
        }
    }
    else {
        Write-Host "❌ No images in API response" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Export failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check your Figma token and try again." -ForegroundColor Yellow
    exit 1
}

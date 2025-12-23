# PowerShell script to download Figma icons
# This script will guide you through downloading icons manually from Figma
# or use Figma API if token is provided

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $projectRoot "public\images\icons"

# Ensure icons directory exists
if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
    Write-Host "✓ Created icons directory: $iconsDir" -ForegroundColor Green
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

Write-Host "📥 Figma Icons Download Script" -ForegroundColor Cyan
Write-Host ""

# Try API method if token is provided
if ($Token) {
    Write-Host "Using Figma API with provided token..." -ForegroundColor Yellow
    
    $nodeIdsString = $nodeIds -join ","
    $apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=png&scale=2"
    $headers = @{
        "X-Figma-Token" = $Token
    }

    try {
        Write-Host "Requesting export URLs from Figma API..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        
        if ($response.images) {
            Write-Host "✓ Got export URLs" -ForegroundColor Green
            Write-Host ""
            
            # Download each image
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
                    } catch {
                        Write-Host "✗ Failed to download $iconName : $_" -ForegroundColor Red
                    }
                } else {
                    Write-Host "⚠️  No URL for node $nodeId ($iconName)" -ForegroundColor Yellow
                }
            }
            
            Write-Host ""
            Write-Host "✨ Download complete!" -ForegroundColor Green
            exit 0
        }
    } catch {
        Write-Host "⚠️  API request failed: $_" -ForegroundColor Yellow
        Write-Host "Falling back to manual download instructions..." -ForegroundColor Yellow
        Write-Host ""
    }
}

# Manual download instructions
Write-Host "📋 Manual Download Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Figma in your browser:" -ForegroundColor White
Write-Host "   https://www.figma.com/design/$fileKey/ALFA-12.15" -ForegroundColor Gray
Write-Host ""
Write-Host "2. For each icon, follow these steps:" -ForegroundColor White
Write-Host ""

for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    $nodeId = $nodeIds[$i]
    $iconName = $iconNames[$i]
    $nodeIdUrl = $nodeId -replace ':', '-'
    
    Write-Host "   Icon: $iconName" -ForegroundColor Cyan
    Write-Host "   URL: https://www.figma.com/design/$fileKey/ALFA-12.15?node-id=$nodeIdUrl" + "&m=dev" -ForegroundColor Gray
    Write-Host "   Steps:" -ForegroundColor White
    Write-Host "     a) Click the link above" -ForegroundColor Gray
    Write-Host "     b) Select the icon element" -ForegroundColor Gray
    Write-Host "     c) In the right panel, click Export or right-click and select Export" -ForegroundColor Gray
    Write-Host "     d) Choose PNG format, scale 2x or 3x" -ForegroundColor Gray
    Write-Host "     e) Save as: $iconName.png" -ForegroundColor Gray
    Write-Host "     f) Place in: $iconsDir" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "3. After downloading all icons, verify they exist:" -ForegroundColor White
Write-Host "   Get-ChildItem $iconsDir\*.png" -ForegroundColor Gray
Write-Host ""

# Check current status
Write-Host "📊 Current Status:" -ForegroundColor Yellow
$allExist = $true
for ($i = 0; $i -lt $iconNames.Length; $i++) {
    $iconName = $iconNames[$i]
    $iconPath = Join-Path $iconsDir "$iconName.png"
    if (Test-Path $iconPath) {
        Write-Host "   ✓ $iconName.png exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $iconName.png missing" -ForegroundColor Red
        $allExist = $false
    }
}

if ($allExist) {
    Write-Host ""
    Write-Host "✨ All icons are present!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  Some icons are missing. Please download them using the instructions above." -ForegroundColor Yellow
}






























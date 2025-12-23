# PowerShell script to download 3 ecocity icon designs from Figma
# This script will guide you through downloading icons manually from Figma
# or use Figma API if token is provided

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$menuIconsDir = Join-Path $projectRoot "public\images\menu-icons"

# Ensure menu-icons directory exists
if (-not (Test-Path $menuIconsDir)) {
    New-Item -ItemType Directory -Force -Path $menuIconsDir | Out-Null
    Write-Host "✓ Created menu-icons directory: $menuIconsDir" -ForegroundColor Green
}

# Figma file key and node IDs
$fileKey = "PoqoKMYQJFXDIWo8qbsKsj"
$nodeIds = @(
    "1080:7700",  # design-1
    "1080:7695",  # design-2
    "1080:7696"   # design-3
)

$fileNames = @(
    "design-1.png",
    "design-2.png",
    "design-3.png"
)

Write-Host "📥 Figma Ecocity Designs Download Script" -ForegroundColor Cyan
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
                $nodeIdForApi = $nodeId -replace ":", "-"
                $fileName = $fileNames[$i]
                $filePath = Join-Path $menuIconsDir $fileName
                
                # Try both formats (with colon and with dash)
                $imageUrl = $null
                if ($response.images.$nodeId) {
                    $imageUrl = $response.images.$nodeId
                } elseif ($response.images.$nodeIdForApi) {
                    $imageUrl = $response.images.$nodeIdForApi
                }
                
                if ($imageUrl) {
                    Write-Host "Downloading $fileName..." -ForegroundColor Yellow
                    
                    try {
                        Invoke-WebRequest -Uri $imageUrl -OutFile $filePath -UseBasicParsing
                        Write-Host "✓ Saved: $fileName" -ForegroundColor Green
                    } catch {
                        Write-Host "✗ Failed to download $fileName : $_" -ForegroundColor Red
                    }
                } else {
                    Write-Host "⚠️  No URL for node $nodeId ($fileName)" -ForegroundColor Yellow
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
Write-Host "   https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?m=dev" -ForegroundColor Gray
Write-Host ""

Write-Host "2. For each design, follow these steps:" -ForegroundColor White
Write-Host ""

for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    $nodeId = $nodeIds[$i]
    $fileName = $fileNames[$i]
    $nodeIdUrl = $nodeId -replace ':', '-'
    
    Write-Host "   Design: $fileName" -ForegroundColor Cyan
    Write-Host "   URL: https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=$nodeIdUrl&m=dev" -ForegroundColor Gray
    Write-Host "   Steps:" -ForegroundColor White
    Write-Host "     a) Click the link above" -ForegroundColor Gray
    Write-Host "     b) Select the design element" -ForegroundColor Gray
    Write-Host "     c) In the right panel, click Export or right-click and select Export" -ForegroundColor Gray
    Write-Host "     d) Choose PNG format, scale 2x or 3x" -ForegroundColor Gray
    Write-Host "     e) Save as: $fileName" -ForegroundColor Gray
    Write-Host "     f) Place in: $menuIconsDir" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "3. After downloading all designs, verify they exist:" -ForegroundColor White
Write-Host "   Get-ChildItem $menuIconsDir\design-*.png" -ForegroundColor Gray
Write-Host ""

# Check current status
Write-Host "📊 Current Status:" -ForegroundColor Yellow
$allExist = $true
for ($i = 0; $i -lt $fileNames.Length; $i++) {
    $fileName = $fileNames[$i]
    $filePath = Join-Path $menuIconsDir $fileName
    if (Test-Path $filePath) {
        Write-Host "   ✓ $fileName exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $fileName missing" -ForegroundColor Red
        $allExist = $false
    }
}

if ($allExist) {
    Write-Host ""
    Write-Host "✨ All designs are present!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⚠️  Some designs are missing. Please download them using the instructions above." -ForegroundColor Yellow
}












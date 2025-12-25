# PowerShell script to download Ecocity Hero section icons from Figma
# Icons: Scroll Down (orange button), Location button, 3D icon button

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

# Figma file key for Ecocity design
$fileKey = "PoqoKMYQJFXDIWo8qbsKsj"

# TODO: Replace with actual node IDs from Figma Dev Mode
# To find node IDs:
# 1. Open Figma Dev Mode: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/...?m=dev
# 2. Select each icon element (Scroll Down button, Location button, 3D icon)
# 3. Copy node-id from URL or Dev Mode panel
$nodeIds = @(
    "XXXX:XXXX",  # Scroll Down icon (orange button)
    "XXXX:XXXX",  # Location icon (circle button)
    "XXXX:XXXX"   # 3D icon button (if different from existing)
)

$iconNames = @(
    "ecocity-scroll-down",
    "ecocity-location",
    "ecocity-3d"
)

# Check if node IDs are still placeholders
$hasPlaceholders = $false
foreach ($nodeId in $nodeIds) {
    if ($nodeId -match "XXXX") {
        $hasPlaceholders = $true
        break
    }
}

if ($hasPlaceholders) {
    Write-Host "❌ Node IDs not configured!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please update node IDs in this script:" -ForegroundColor Yellow
    Write-Host "1. Open Figma Dev Mode for Ecocity design" -ForegroundColor White
    Write-Host "2. Select each icon element:" -ForegroundColor White
    Write-Host "   - Scroll Down button (orange)" -ForegroundColor Gray
    Write-Host "   - Location button" -ForegroundColor Gray
    Write-Host "   - 3D icon button" -ForegroundColor Gray
    Write-Host "3. Copy node-id from URL or Dev Mode panel" -ForegroundColor White
    Write-Host "4. Update `$nodeIds array in this script" -ForegroundColor White
    Write-Host ""
    Write-Host "Figma file: https://www.figma.com/design/$fileKey/...?m=dev" -ForegroundColor Cyan
    exit 1
}

Write-Host "📥 Figma Ecocity Hero Icons Download Script" -ForegroundColor Cyan
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
                $fileName = "$($iconNames[$i]).png"
                $filePath = Join-Path $iconsDir $fileName
                
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
} else {
    Write-Host "⚠️  Figma token not provided" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Token will be read from:" -ForegroundColor Cyan
    Write-Host "  1. Environment variable FIGMA_TOKEN" -ForegroundColor White
    Write-Host "  2. Command line parameter: -Token 'your-token'" -ForegroundColor White
    Write-Host "  3. ~/.cursor/mcp.json (figma-api-key)" -ForegroundColor White
    Write-Host ""
}

# Manual download instructions
Write-Host "📋 Manual Download Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Figma Dev Mode in your browser:" -ForegroundColor White
Write-Host "   https://www.figma.com/design/$fileKey/...?m=dev" -ForegroundColor Gray
Write-Host ""

Write-Host "2. For each icon, follow these steps:" -ForegroundColor White
Write-Host ""

for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    $nodeId = $nodeIds[$i]
    $fileName = "$($iconNames[$i]).png"
    $nodeIdUrl = $nodeId -replace ':', '-'
    
    Write-Host "   Icon: $fileName" -ForegroundColor Cyan
    Write-Host "   URL: https://www.figma.com/design/$fileKey/...?node-id=$nodeIdUrl&m=dev" -ForegroundColor Gray
    Write-Host "   Steps:" -ForegroundColor White
    Write-Host "     a) Click the link above" -ForegroundColor Gray
    Write-Host "     b) Select the icon element" -ForegroundColor Gray
    Write-Host "     c) In the right panel, click Export or right-click and select Export" -ForegroundColor Gray
    Write-Host "     d) Choose PNG format, scale 2x or 3x" -ForegroundColor Gray
    Write-Host "     e) Save as: $fileName" -ForegroundColor Gray
    Write-Host "     f) Place in: $iconsDir" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "3. After downloading all icons, verify they exist:" -ForegroundColor White
Write-Host "   Get-ChildItem $iconsDir\ecocity-*.png" -ForegroundColor Gray
Write-Host ""

# Check current status
Write-Host "📊 Current Status:" -ForegroundColor Yellow
$allExist = $true
for ($i = 0; $i -lt $iconNames.Length; $i++) {
    $fileName = "$($iconNames[$i]).png"
    $filePath = Join-Path $iconsDir $fileName
    if (Test-Path $filePath) {
        Write-Host "   ✓ $fileName exists" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $fileName missing" -ForegroundColor Red
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



















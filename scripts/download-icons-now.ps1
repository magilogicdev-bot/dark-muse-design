# PowerShell script to download Figma icons using Figma API
# This script will attempt to download icons if FIGMA_TOKEN is available
# Otherwise, it will provide manual download instructions

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

$Token = $env:FIGMA_TOKEN

if (-not $Token) {
    Write-Host "⚠️  Figma token not found in environment variables" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To download icons automatically:" -ForegroundColor Cyan
    Write-Host "1. Get your Figma Personal Access Token from: https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Set environment variable: `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or download manually from Figma:" -ForegroundColor Cyan
    for ($i = 0; $i -lt $nodeIds.Length; $i++) {
        $nodeId = $nodeIds[$i]
        $iconName = $iconNames[$i]
        $nodeIdUrl = $nodeId -replace ':', '-'
        Write-Host "  $iconName.png: https://www.figma.com/design/$fileKey/ALFA-12.15?node-id=$nodeIdUrl`&m=dev" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "Export each icon as PNG (2x or 3x scale) and save to: $iconsDir" -ForegroundColor White
    exit 0
}

Write-Host "📥 Downloading Figma icons using API..." -ForegroundColor Cyan
Write-Host ""

# Construct node IDs string for API
$nodeIdsString = $nodeIds -join ","

# Get export URLs from Figma API
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
                }
                catch {
                    Write-Host "✗ Failed to download $iconName : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "⚠️  No URL for node $nodeId ($iconName)" -ForegroundColor Yellow
            }
        }
        
        Write-Host ""
        Write-Host "✨ Download complete!" -ForegroundColor Green
    } else {
        Write-Host "❌ No images in API response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json -Depth 5)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ API request failed: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    Write-Host ""
    Write-Host "Please check your Figma token and try again, or download icons manually." -ForegroundColor Yellow
    exit 1
}

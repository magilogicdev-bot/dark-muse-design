# PowerShell script to download Figma icons using Figma API
# Requires Figma Personal Access Token
# Usage: .\scripts\download-figma-icons-api.ps1 -Token "your-figma-token"

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

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Pass as parameter:" -ForegroundColor Yellow
    Write-Host "   .\scripts\download-figma-icons-api.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "To get a token:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Scroll to 'Personal access tokens'" -ForegroundColor White
    Write-Host "3. Create a new token" -ForegroundColor White
    exit 1
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
                } catch {
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
    exit 1
}







# PowerShell script to download logo assets from Figma
# Usage: .\scripts\download-logo-assets.ps1

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$imagesDir = Join-Path $projectRoot "public\images"

# Ensure images directory exists
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null
    Write-Host "✓ Created images directory: $imagesDir" -ForegroundColor Green
}

# Figma file key and node IDs
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeIds = @(
    "5201:45",  # SBER Logo Group
    "1032:21"   # ALFA Logo
)

$logoNames = @(
    "sber-logo",
    "alfa-logo"
)

Write-Host "📥 Downloading Logo Assets from Figma..." -ForegroundColor Cyan
Write-Host ""

# Try API method if token is provided
if ($Token) {
    Write-Host "Using Figma API with provided token..." -ForegroundColor Yellow
    
    $nodeIdsString = $nodeIds -join ","
    $apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$nodeIdsString&format=svg&scale=1"
    $headers = @{
        "X-Figma-Token" = $Token
    }

    try {
        Write-Host "Requesting export URLs from Figma API..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        
        if ($response.images) {
            Write-Host "✓ Got export URLs" -ForegroundColor Green
            Write-Host ""
            
            # Download each logo
            for ($i = 0; $i -lt $nodeIds.Length; $i++) {
                $nodeId = $nodeIds[$i]
                $logoName = $logoNames[$i]
                $logoPath = Join-Path $imagesDir "$logoName.svg"
                
                if ($response.images.$nodeId) {
                    $imageUrl = $response.images.$nodeId
                    Write-Host "Downloading $logoName..." -ForegroundColor Yellow
                    
                    try {
                        Invoke-WebRequest -Uri $imageUrl -OutFile $logoPath -UseBasicParsing
                        Write-Host "✓ Saved: $logoName.svg" -ForegroundColor Green
                    }
                    catch {
                        Write-Host "✗ Failed to download $logoName : $_" -ForegroundColor Red
                    }
                }
                else {
                    Write-Host "⚠️  No URL for node $nodeId ($logoName)" -ForegroundColor Yellow
                }
            }
            
            Write-Host ""
            Write-Host "✨ Download complete!" -ForegroundColor Green
            exit 0
        }
        else {
            Write-Host "⚠️  No images in API response" -ForegroundColor Yellow
        }
    }
    catch {
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
Write-Host "2. For each logo, follow these steps:" -ForegroundColor White
Write-Host ""

for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    $nodeId = $nodeIds[$i]
    $logoName = $logoNames[$i]
    $nodeIdUrl = $nodeId -replace ":", "-"
    $url = "https://www.figma.com/design/$fileKey/ALFA-12.15?node-id=$nodeIdUrl" + "&m=dev"
    Write-Host "   $($i+1). $logoName (node: $nodeId)" -ForegroundColor Cyan
    Write-Host "      URL: $url" -ForegroundColor Gray
    Write-Host "      - Select the node in Figma" -ForegroundColor White
    Write-Host "      - Right-click, then Export, then SVG" -ForegroundColor White
    Write-Host "      - Save as: $logoName.svg" -ForegroundColor White
    Write-Host "      - Place in: $imagesDir" -ForegroundColor White
    Write-Host ""
}

Write-Host "3. After downloading, verify files exist:" -ForegroundColor White
for ($i = 0; $i -lt $logoNames.Length; $i++) {
    $logoName = $logoNames[$i]
    $logoPath = Join-Path $imagesDir "$logoName.svg"
    Write-Host "   - $logoPath" -ForegroundColor Gray
}
Write-Host ""

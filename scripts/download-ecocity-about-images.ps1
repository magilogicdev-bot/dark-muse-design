# PowerShell script to download Ecocity About section images from Figma via MCP
# Images: Main building, Courtyard, Playground, Facade detail, Gallery

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

# Figma file key
$fileKey = "PoqoKMYQJFXDIWo8qbsKsj"

# Node IDs from Figma URLs (format: 1080:7609)
$nodeIds = @(
    "1080:7609",  # Main building image (large, left)
    "1080:7690",  # Courtyard image (top-left small)
    "1080:7689",  # Playground image (top-right small)
    "1080:7693",  # Facade detail image (bottom-left small)
    "1080:7691"   # Gallery image with overlay (bottom-right small)
)

$fileNames = @(
    "ecocity-about-main.png",
    "ecocity-about-courtyard.png",
    "ecocity-about-playground.png",
    "ecocity-about-facade.png",
    "ecocity-about-gallery.png"
)

Write-Host "📥 Figma Ecocity About Section Images Download Script" -ForegroundColor Cyan
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
            $downloaded = 0
            for ($i = 0; $i -lt $nodeIds.Count; $i++) {
                $nodeId = $nodeIds[$i]
                $fileName = $fileNames[$i]
                $filePath = Join-Path $imagesDir $fileName
                
                if ($response.images.$nodeId) {
                    $imageUrl = $response.images.$nodeId
                    Write-Host "📸 Downloading $fileName..." -ForegroundColor Yellow
                    
                    try {
                        Invoke-WebRequest -Uri $imageUrl -OutFile $filePath -UseBasicParsing
                        Write-Host "✅ Downloaded: $fileName" -ForegroundColor Green
                        $downloaded++
                    } catch {
                        Write-Host "❌ Error downloading $fileName : $_" -ForegroundColor Red
                    }
                } else {
                    Write-Host "⚠️  No image URL found for node $nodeId" -ForegroundColor Yellow
                }
            }
            
            Write-Host ""
            Write-Host "✨ Downloaded $downloaded of $($nodeIds.Count) images" -ForegroundColor Cyan
        } else {
            Write-Host "❌ No images in API response" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ API Error: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please check:" -ForegroundColor Yellow
        Write-Host "1. FIGMA_TOKEN is valid and not expired" -ForegroundColor White
        Write-Host "2. You have access to the Figma file" -ForegroundColor White
        Write-Host "3. Node IDs are correct" -ForegroundColor White
        exit 1
    }
} else {
    Write-Host "❌ FIGMA_TOKEN is required" -ForegroundColor Red
    Write-Host ""
    Write-Host "Token will be read from:" -ForegroundColor Yellow
    Write-Host "  1. Environment variable FIGMA_TOKEN" -ForegroundColor White
    Write-Host "  2. Command line parameter: -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Example:" -ForegroundColor Cyan
    Write-Host "  .\download-ecocity-about-images.ps1 -Token 'your-figma-token'" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "✨ Done!" -ForegroundColor Green


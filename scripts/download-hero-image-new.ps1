# PowerShell script to download hero image from Figma
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
}

# Figma file key and node ID
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeId = "1057:5189"
$nodeIdForApi = "1057-5189"

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    exit 1
}

Write-Host "📥 Downloading hero image from Figma..." -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "Requesting export URL from Figma API..." -ForegroundColor Yellow
    $queryParams = "ids=$nodeIdForApi&format=png&scale=2"
    $apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?" + $queryParams
    $headers = @{
        "X-Figma-Token" = $Token
    }
    
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images.$nodeIdForApi) {
        $imageUrl = $response.images.$nodeIdForApi
        $imagePath = Join-Path $imagesDir "buy-apartment-hero.png"
        
        Write-Host "Downloading image..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
        Write-Host "✓ Saved: buy-apartment-hero.png" -ForegroundColor Green
    } else {
        Write-Host "❌ No image URL in response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
}














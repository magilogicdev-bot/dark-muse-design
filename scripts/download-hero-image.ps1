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
    Write-Host "✓ Created images directory: $imagesDir" -ForegroundColor Green
}

# Figma file key and node ID
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeId = "1057:5105"  # Hero section image node ID
$imageName = "buy-apartment-hero"

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Pass as parameter:" -ForegroundColor Yellow
    Write-Host "   .\scripts\download-hero-image.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "To get a token:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Scroll to 'Personal access tokens'" -ForegroundColor White
    Write-Host "3. Create a new token" -ForegroundColor White
    exit 1
}

Write-Host "📥 Downloading hero image from Figma..." -ForegroundColor Cyan
Write-Host ""

# Get export URL from Figma API
$apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeId&format=png&scale=2"
$headers = @{
    "X-Figma-Token" = $Token
}

try {
    Write-Host "Requesting export URL from Figma API..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images -and $response.images.$nodeId) {
        $imageUrl = $response.images.$nodeId
        Write-Host "✓ Got export URL" -ForegroundColor Green
        Write-Host ""
        
        # Download image
        $imagePath = Join-Path $imagesDir "$imageName.png"
        Write-Host "Downloading image..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -Headers $headers
        
        Write-Host "✓ Image downloaded successfully!" -ForegroundColor Green
        Write-Host "  Saved to: $imagePath" -ForegroundColor White
        Write-Host ""
        Write-Host "✨ Done!" -ForegroundColor Cyan
    } else {
        Write-Host "❌ No image URL in API response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Yellow
    }
    exit 1
}

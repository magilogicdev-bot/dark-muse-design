# PowerShell script to download Figma news images using Figma API
# Requires Figma Personal Access Token
# Usage: .\scripts\download-news-images.ps1 -Token "your-figma-token"

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$newsDir = Join-Path $projectRoot "public\images\news"

# Ensure news directory exists
if (-not (Test-Path $newsDir)) {
    New-Item -ItemType Directory -Force -Path $newsDir | Out-Null
}

# Figma file key
$fileKey = "dbhRRPEagcwqR97v2vLgAd"

# Node IDs for news images - these need to be updated with actual node IDs from Figma
# You can find node IDs by selecting each image in Figma Dev Mode
$nodeIds = @(
    "1038:XXXX",  # News 1 - Важное событие для будущих жителей
    "1038:XXXX",  # News 2 - вокруг ЖК «Экогород 2» был убран забор
    "1038:XXXX",  # News 3 - ЖК «Экогород 3» – дом заметно подрос (construction)
    "1038:XXXX",  # News 4 - ЖК «Экогород 3» – дом заметно подрос (exit sign)
    "1038:XXXX",  # News 5 - Building facade
    "1038:XXXX"   # News 6 - Construction site
)

$imageNames = @(
    "news-1",
    "news-2",
    "news-3",
    "news-4",
    "news-5",
    "news-6"
)

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Pass as parameter:" -ForegroundColor Yellow
    Write-Host "   .\scripts\download-news-images.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "To get a token:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Scroll to 'Personal access tokens'" -ForegroundColor White
    Write-Host "3. Create a new token" -ForegroundColor White
    Write-Host ""
    Write-Host "To find node IDs:" -ForegroundColor Yellow
    Write-Host "1. Open Figma Dev Mode: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev" -ForegroundColor White
    Write-Host "2. Select each news image" -ForegroundColor White
    Write-Host "3. Copy the node-id from the URL or Dev Mode panel" -ForegroundColor White
    Write-Host "4. Update the nodeIds array in this script" -ForegroundColor White
    exit 1
}

Write-Host "📥 Downloading Figma news images using API..." -ForegroundColor Cyan
Write-Host ""

# Filter out placeholder node IDs
$validNodeIds = @()
$validImageNames = @()
for ($i = 0; $i -lt $nodeIds.Length; $i++) {
    if ($nodeIds[$i] -notmatch "XXXX") {
        $validNodeIds += $nodeIds[$i]
        $validImageNames += $imageNames[$i]
    }
}

if ($validNodeIds.Length -eq 0) {
    Write-Host "⚠️  No valid node IDs found. Please update the nodeIds array with actual node IDs from Figma." -ForegroundColor Yellow
    exit 1
}

# Construct node IDs string for API
$nodeIdsString = $validNodeIds -join ","

# Get export URLs from Figma API
$apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=webp&scale=2"
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
        for ($i = 0; $i -lt $validNodeIds.Length; $i++) {
            $nodeId = $validNodeIds[$i]
            $imageName = $validImageNames[$i]
            $imagePath = Join-Path $newsDir "$imageName.webp"
            
            if ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "Downloading $imageName..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "✓ Saved: $imageName.webp" -ForegroundColor Green
                } catch {
                    Write-Host "✗ Failed to download $imageName : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "⚠️  No URL for node $nodeId ($imageName)" -ForegroundColor Yellow
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

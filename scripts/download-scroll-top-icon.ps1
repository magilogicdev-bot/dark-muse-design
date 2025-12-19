# Download scroll to top icon from Figma
param(
    [string]$Token = $env:FIGMA_TOKEN
)

$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeId = "1044:3530"

if (-not $Token) {
    Write-Host "❌ FIGMA_TOKEN is required" -ForegroundColor Red
    Write-Host "Usage: .\scripts\download-scroll-top-icon.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host "Or set: `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    exit 1
}

$projectRoot = Split-Path -Parent $PSScriptRoot
$iconsDir = Join-Path $projectRoot "public\images\icons"

if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Force -Path $iconsDir | Out-Null
}

$apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$nodeId" + "&format=png" + "&scale=3"
$headers = @{
    "X-Figma-Token" = $token
}

try {
    Write-Host "Requesting export URL from Figma API..." -ForegroundColor Yellow
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images.$nodeId) {
        $imageUrl = $response.images.$nodeId
        $iconPath = Join-Path $iconsDir "scroll-to-top.png"
        
        Write-Host "Downloading scroll-to-top icon..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $imageUrl -OutFile $iconPath -UseBasicParsing
        Write-Host "✓ Saved: scroll-to-top.png" -ForegroundColor Green
    }
    else {
        Write-Host "❌ No URL for node $nodeId" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

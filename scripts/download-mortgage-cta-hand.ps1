# PowerShell script to download Mortgage CTA Hand icon from Figma
# Requires Figma Personal Access Token
# Usage: .\scripts\download-mortgage-cta-hand.ps1 -Token "your-figma-token"

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

# Figma file key and node IDs for hand icon
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$nodeIds = @(
    "1032:190",  # Hand icon option 1
    "1032:193"   # Hand icon option 2
)

$iconName = "mortgage-cta-hand"

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Pass as parameter:" -ForegroundColor Yellow
    Write-Host "   .\scripts\download-mortgage-cta-hand.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "To get a token:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Scroll to 'Personal access tokens'" -ForegroundColor White
    Write-Host "3. Create a new token" -ForegroundColor White
    exit 1
}

Write-Host "📥 Downloading Mortgage CTA Hand icon from Figma..." -ForegroundColor Cyan
Write-Host ""

# Try first node ID, then second if first fails
$success = $false
foreach ($nodeId in $nodeIds) {
    # Construct node IDs string for API
    $nodeIdsString = $nodeId
    
    # Get export URLs from Figma API
    $apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=png&scale=2"
    $headers = @{
        "X-Figma-Token" = $Token
    }
    
    try {
        Write-Host "Trying node $nodeId..." -ForegroundColor Yellow
        $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        
        if ($response.images -and $response.images.$nodeId) {
            $imageUrl = $response.images.$nodeId
            $iconPath = Join-Path $imagesDir "$iconName.png"
            
            Write-Host "Downloading hand icon..." -ForegroundColor Yellow
            Invoke-WebRequest -Uri $imageUrl -OutFile $iconPath -UseBasicParsing
            Write-Host "✓ Saved: $iconName.png" -ForegroundColor Green
            Write-Host "✨ Download complete!" -ForegroundColor Green
            $success = $true
            break
        }
    } catch {
        Write-Host "⚠️  Node $nodeId failed: $_" -ForegroundColor Yellow
        continue
    }
}

if (-not $success) {
    Write-Host "❌ Failed to download hand icon from both node IDs" -ForegroundColor Red
    Write-Host "Please check the node IDs in Figma or export manually:" -ForegroundColor Yellow
    Write-Host "  - https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1032-190&m=dev" -ForegroundColor White
    Write-Host "  - https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1032-193&m=dev" -ForegroundColor White
    exit 1
}

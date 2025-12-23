# PowerShell script to download contact page images from Figma
param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$contactsDir = Join-Path $projectRoot "public\images\contacts"

# Ensure contacts directory exists
if (-not (Test-Path $contactsDir)) {
    New-Item -ItemType Directory -Force -Path $contactsDir | Out-Null
    Write-Host "✓ Created contacts directory: $contactsDir" -ForegroundColor Green
}

# Get token from parameter or try to read from MCP config
if (-not $Token) {
    $mcpConfigPath = Join-Path $env:USERPROFILE ".cursor\mcp.json"
    if (Test-Path $mcpConfigPath) {
        $mcpContent = Get-Content $mcpConfigPath -Raw | ConvertFrom-Json
        if ($mcpContent.servers -and $mcpContent.servers['figma-api']) {
            $args = $mcpContent.servers['figma-api'].args
            $apiKeyArg = $args | Where-Object { $_ -like '--figma-api-key=*' }
            if ($apiKeyArg) {
                $Token = $apiKeyArg -replace '--figma-api-key=', ''
            }
        }
    }
}

# Use provided token if available
if (-not $Token) {
    $Token = ":FIGMA_TOKEN"
}

# Figma file key and node IDs for contacts page
# File: HKJCXfKmo3ptpjTU8NW5ce
# Main node: 1114-10692
$fileKey = "HKJCXfKmo3ptpjTU8NW5ce"
$mainNodeId = "1114:10692"

Write-Host "📥 Downloading Contact Page Images from Figma" -ForegroundColor Cyan
$figmaUrl = "https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=1114-10692&m=dev"
Write-Host "Figma URL: $figmaUrl" -ForegroundColor Gray
Write-Host ""

# First, get the file structure to find node IDs
Write-Host "Fetching file structure from Figma API..." -ForegroundColor Yellow
$fileUrl = "https://api.figma.com/v1/files/$fileKey"
$headers = @{
    "X-Figma-Token" = $Token
}

try {
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    # Find the contacts page node
    Write-Host "✓ Got file structure" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  Note: To download specific images, we need their node IDs." -ForegroundColor Yellow
    Write-Host "Please export images manually from Figma Dev Mode:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Open Figma Dev Mode:" -ForegroundColor White
    Write-Host "   $figmaUrl" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. For each image element:" -ForegroundColor White
    Write-Host "   - Select the image/layer" -ForegroundColor Gray
    Write-Host "   - Check the node ID in Dev Mode (right sidebar)" -ForegroundColor Gray
    Write-Host "   - Export as PNG (2x scale) or use Export panel" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Required images for contacts page:" -ForegroundColor Cyan
    Write-Host "  - building-photo.png (Business Center Towers)" -ForegroundColor White
    Write-Host "  - map-iso.png (Isometric map background)" -ForegroundColor White
    Write-Host "  - map-overlay.png (Map overlay/grid if separate)" -ForegroundColor White
    Write-Host "  - marker-ecoland.png (EcoPark marker)" -ForegroundColor White
    Write-Host "  - marker-globus.png (Globus shopping center)" -ForegroundColor White
    Write-Host "  - marker-clinic.png (Polyclinic)" -ForegroundColor White
    Write-Host "  - marker-school.png (School construction)" -ForegroundColor White
    Write-Host "  - logo-vkusno-big.png (Vkusno i Tochka logo)" -ForegroundColor White
    Write-Host ""
    
    # Try to export the main node as an image to see what we get
    Write-Host "Attempting to export main contacts page node..." -ForegroundColor Yellow
    $exportUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$mainNodeId" + "&format=png&scale=2"
    
    try {
        $exportResponse = Invoke-RestMethod -Uri $exportUrl -Headers $headers -Method Get
        if ($exportResponse.images -and $exportResponse.images.$mainNodeId) {
            $imageUrl = $exportResponse.images.$mainNodeId
            $imagePath = Join-Path $contactsDir "contacts-page-full.png"
            Write-Host "Downloading full page export..." -ForegroundColor Yellow
            Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
            Write-Host "✓ Saved full page export: contacts-page-full.png" -ForegroundColor Green
            Write-Host "   (Use this as reference to extract individual images)" -ForegroundColor Gray
        }
    } catch {
        Write-Host "⚠️  Could not export main node: $_" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Failed to fetch file structure: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  1. Your Figma token is valid" -ForegroundColor White
    Write-Host "  2. You have access to this Figma file" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 Tip: Use Figma Dev Mode to find node IDs for individual images" -ForegroundColor Cyan
Write-Host "   Then update this script with specific node IDs to download them automatically" -ForegroundColor Gray


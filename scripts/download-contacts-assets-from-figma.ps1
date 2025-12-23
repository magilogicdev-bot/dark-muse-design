# PowerShell script to download contact page images from Figma using provided token
param(
    [Parameter(Mandatory=$false)]
    [string]$Token = ":FIGMA_TOKEN"
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$contactsDir = Join-Path $projectRoot "public\images\contacts"

# Ensure contacts directory exists
if (-not (Test-Path $contactsDir)) {
    New-Item -ItemType Directory -Force -Path $contactsDir | Out-Null
    Write-Host "✓ Created contacts directory: $contactsDir" -ForegroundColor Green
}

# Figma file key and main node ID
$fileKey = "HKJCXfKmo3ptpjTU8NW5ce"
$mainNodeId = "1114:10692"

Write-Host "📥 Downloading Contact Page Assets from Figma" -ForegroundColor Cyan
Write-Host "Figma URL: https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=1114-10692&m=dev" -ForegroundColor Gray
Write-Host ""

$headers = @{
    "X-Figma-Token" = $Token
}

# Try to export the main contacts page frame as reference
Write-Host "Attempting to export main contacts page frame..." -ForegroundColor Yellow
$exportUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$mainNodeId" + "&format=png&scale=2"

try {
    $exportResponse = Invoke-RestMethod -Uri $exportUrl -Headers $headers -Method Get
    
    if ($exportResponse.images) {
        $images = $exportResponse.images
        $nodeIdKey = $mainNodeId -replace ":", "-"
        
        # Try both formats of node ID (with colon and with dash)
        $imageUrl = $null
        if ($images.PSObject.Properties.Name -contains $mainNodeId) {
            $imageUrl = $images.$mainNodeId
        } elseif ($images.PSObject.Properties.Name -contains $nodeIdKey) {
            $imageUrl = $images.$nodeIdKey
        }
        
        if ($imageUrl) {
            $imagePath = Join-Path $contactsDir "contacts-page-reference.png"
            Write-Host "Downloading full page export..." -ForegroundColor Yellow
            Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
            Write-Host "✓ Saved reference image: contacts-page-reference.png" -ForegroundColor Green
            Write-Host "   Use this as reference to identify node IDs for individual images" -ForegroundColor Gray
        } else {
            Write-Host "⚠️  Could not find export URL for node ID: $mainNodeId" -ForegroundColor Yellow
            Write-Host "   Available node IDs: $($images.PSObject.Properties.Name -join ', ')" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠️  No images in response" -ForegroundColor Yellow
        Write-Host "   Response: $($exportResponse | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
    }
} catch {
    Write-Host "⚠️  Could not export main node: $_" -ForegroundColor Yellow
    Write-Host "   Error details: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📋 To download specific images, you need their node IDs from Figma Dev Mode:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Open Figma Dev Mode:" -ForegroundColor White
Write-Host "   https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=1114-10692&m=dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. For each image element, select it and note the node ID from the right sidebar" -ForegroundColor White
Write-Host ""
Write-Host "3. Required images and their expected filenames:" -ForegroundColor Yellow
Write-Host "   - building-photo.png (Business Center Towers photo)" -ForegroundColor White
Write-Host "   - map-iso.png (Isometric map background)" -ForegroundColor White
Write-Host "   - map-overlay.png (Map overlay/grid, if separate)" -ForegroundColor White
Write-Host "   - marker-ecoland.png (EcoPark marker icon)" -ForegroundColor White
Write-Host "   - marker-globus.png (Globus shopping center icon)" -ForegroundColor White
Write-Host "   - marker-clinic.png (Polyclinic icon)" -ForegroundColor White
Write-Host "   - marker-school.png (School construction icon)" -ForegroundColor White
Write-Host "   - logo-vkusno-big.png (Vkusno i Tochka logo)" -ForegroundColor White
Write-Host ""
Write-Host "4. Once you have node IDs, update this script or use the Figma API directly:" -ForegroundColor White
Write-Host "   https://api.figma.com/v1/images/$fileKey?ids=NODE_ID&format=png&scale=2" -ForegroundColor Gray
Write-Host ""

Write-Host "💡 Tip: Use Figma Dev Mode to inspect each image element and get its node ID" -ForegroundColor Cyan
Write-Host "   Then you can download them programmatically using the Figma API" -ForegroundColor Gray

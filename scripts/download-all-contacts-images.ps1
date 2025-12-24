# PowerShell script to download all contact page images from Figma
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

# Figma file key
$fileKey = "HKJCXfKmo3ptpjTU8NW5ce"

# Node IDs for images found in the file structure
# These are the RECTANGLE nodes that contain images
$nodeIds = @(
    "1114:10703",  # image 50 - possibly building photo
    "1114:10710",  # image 47 - possibly another image
    "1114:10721",  # image 49 - possibly map or marker
    "1114:10861",  # image 68 - marker
    "1114:10862",  # image 70 - marker
    "1114:10868",  # image 72 - marker
    "1114:10869",  # image 71 - marker
    "1114:10870",  # image 73 - marker
    "1114:10871",  # image 74 - marker
    "1114:10965"   # 235325235235 1 - possibly map background
)

# Try to map to expected filenames (will need adjustment based on actual content)
$imageNames = @(
    "image-50.png",
    "image-47.png",
    "image-49.png",
    "marker-1.png",
    "marker-2.png",
    "marker-3.png",
    "marker-4.png",
    "marker-5.png",
    "marker-6.png",
    "map-background.png"
)

Write-Host "📥 Downloading Contact Page Images from Figma" -ForegroundColor Cyan
Write-Host ""

$headers = @{
    "X-Figma-Token" = $Token
}

# Join node IDs with comma
$nodeIdsString = $nodeIds -join ","

# Build export URL
$exportUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$nodeIdsString" + "&format=png&scale=2"

Write-Host "Requesting export URLs for $($nodeIds.Count) images..." -ForegroundColor Yellow

try {
    $exportResponse = Invoke-RestMethod -Uri $exportUrl -Headers $headers -Method Get
    
    if ($exportResponse.images) {
        Write-Host "✓ Got export URLs" -ForegroundColor Green
        Write-Host ""
        
        $images = $exportResponse.images
        $downloadedCount = 0
        
        for ($i = 0; $i -lt $nodeIds.Length; $i++) {
            $nodeId = $nodeIds[$i]
            $imageName = $imageNames[$i]
            
            # Try both formats (with colon and with dash)
            $nodeIdKey = $nodeId -replace ":", "-"
            $imageUrl = $null
            
            if ($images.PSObject.Properties.Name -contains $nodeId) {
                $imageUrl = $images.$nodeId
            } elseif ($images.PSObject.Properties.Name -contains $nodeIdKey) {
                $imageUrl = $images.$nodeIdKey
            }
            
            if ($imageUrl) {
                $imagePath = Join-Path $contactsDir $imageName
                Write-Host "[$($i+1)/$($nodeIds.Length)] Downloading $imageName (node: $nodeId)..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "  ✓ Saved: $imageName" -ForegroundColor Green
                    $downloadedCount++
                } catch {
                    Write-Host "  ✗ Failed: $_" -ForegroundColor Red
                }
            } else {
                Write-Host "[$($i+1)/$($nodeIds.Length)] ⚠️  No URL for node $nodeId ($imageName)" -ForegroundColor Yellow
            }
        }
        
        Write-Host ""
        Write-Host "✨ Download complete! Downloaded $downloadedCount of $($nodeIds.Length) images" -ForegroundColor Green
        Write-Host ""
        Write-Host "💡 Tip: Review the downloaded images and rename them according to their content:" -ForegroundColor Cyan
        Write-Host "   - building-photo.png (Business Center Towers)" -ForegroundColor Gray
        Write-Host "   - map-iso.png (Isometric map)" -ForegroundColor Gray
        Write-Host "   - marker-ecoland.png, marker-globus.png, etc. (Map markers)" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  No images in API response" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host "   Error details: $($_.Exception.Message)" -ForegroundColor Gray
}


# Simplified script to download news images
# Just provide your Figma token and it will try to find and download images

param(
    [Parameter(Mandatory=$true)]
    [string]$Token
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$newsDir = Join-Path $projectRoot "public\images\news"

if (-not (Test-Path $newsDir)) {
    New-Item -ItemType Directory -Force -Path $newsDir | Out-Null
}

$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$parentNodeId = "1038:491"

$headers = @{
    "X-Figma-Token" = $Token
}

Write-Host "🔍 Analyzing Figma file structure..." -ForegroundColor Cyan
Write-Host ""

try {
    # Get file structure
    $fileUrl = "https://api.figma.com/v1/files/$fileKey/nodes?ids=$parentNodeId"
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    if (-not $fileResponse.nodes.$parentNodeId) {
        Write-Host "❌ Could not access parent node. Check your token and node ID." -ForegroundColor Red
        exit 1
    }
    
    $parentNode = $fileResponse.nodes.$parentNodeId.document
    
    # Recursively find all nodes with images
    function Find-ImageContainers {
        param([object]$node, [array]$found = @())
        
        # Check if node has image fill
        $hasImage = $false
        if ($node.fills) {
            foreach ($fill in $node.fills) {
                if ($fill.type -eq "IMAGE") {
                    $hasImage = $true
                    break
                }
            }
        }
        
        if ($hasImage -and ($node.type -eq "RECTANGLE" -or $node.type -eq "FRAME")) {
            $found += @{
                id = $node.id
                name = $node.name
                type = $node.type
            }
        }
        
        if ($node.children) {
            foreach ($child in $node.children) {
                $found = Find-ImageContainers -node $child -found $found
            }
        }
        
        return $found
    }
    
    Write-Host "Searching for image containers..." -ForegroundColor Yellow
    $imageContainers = Find-ImageContainers -node $parentNode
    
    if ($imageContainers.Count -eq 0) {
        Write-Host "⚠️  No image containers found automatically." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please manually find node IDs:" -ForegroundColor Yellow
        Write-Host "1. Open: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491`&m=dev" -ForegroundColor White
        Write-Host "2. Click on each news image" -ForegroundColor White
        Write-Host "3. Copy node-id from URL (format: 1038:XXXX)" -ForegroundColor White
        Write-Host "4. Update scripts/download-news-images.ps1" -ForegroundColor White
        exit 1
    }
    
    # Filter to likely news images (take first 6 frames/rectangles that are likely news cards)
    $newsImages = $imageContainers | Where-Object { 
        $_.type -eq "RECTANGLE" -or 
        ($_.type -eq "FRAME" -and $_.name -notlike "*icon*" -and $_.name -notlike "*button*")
    } | Select-Object -First 6
    
    if ($newsImages.Count -lt 6) {
        Write-Host "⚠️  Found only $($newsImages.Count) images. Using all found images." -ForegroundColor Yellow
    }
    
    Write-Host "✓ Found $($newsImages.Count) image nodes" -ForegroundColor Green
    Write-Host ""
    
    # Display found nodes
    Write-Host "Found image nodes:" -ForegroundColor Cyan
    foreach ($img in $newsImages) {
        Write-Host "  - $($img.id): $($img.name) ($($img.type))" -ForegroundColor White
    }
    Write-Host ""
    
    # Get node IDs
    $nodeIds = $newsImages | ForEach-Object { $_.id }
    $nodeIdsString = $nodeIds -join ","
    
    # Get export URLs
    Write-Host "Requesting export URLs..." -ForegroundColor Yellow
    $apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=webp&scale=2"
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "✓ Got export URLs" -ForegroundColor Green
        Write-Host ""
        
        # Download each image
        $index = 1
        foreach ($img in $newsImages) {
            $nodeId = $img.id
            $imageName = "news-$index"
            $imagePath = Join-Path $newsDir "$imageName.webp"
            
            if ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "[$index/$($newsImages.Count)] Downloading $imageName..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "  ✓ Saved: $imageName.webp" -ForegroundColor Green
                } catch {
                    Write-Host "  ✗ Failed: $_" -ForegroundColor Red
                }
            } else {
                Write-Host "  ⚠️  No export URL for node $nodeId" -ForegroundColor Yellow
            }
            
            $index++
        }
        
        Write-Host ""
        Write-Host "✨ Download complete! Images saved to: $newsDir" -ForegroundColor Green
    } else {
        Write-Host "❌ No images in API response" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 403) {
            Write-Host "Access denied. Check your Figma token." -ForegroundColor Red
        } elseif ($statusCode -eq 404) {
            Write-Host "File or node not found. Check file key and node ID." -ForegroundColor Red
        }
    }
    exit 1
}

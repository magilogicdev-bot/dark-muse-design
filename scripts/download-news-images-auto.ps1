# PowerShell script to automatically find and download Figma news images
# Requires Figma Personal Access Token
# Usage: .\scripts\download-news-images-auto.ps1 -Token "your-figma-token"

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

# Figma file key and parent node ID
$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$parentNodeId = "1038:491"

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Option 1: Set environment variable:" -ForegroundColor Yellow
    Write-Host "   `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Pass as parameter:" -ForegroundColor Yellow
    Write-Host "   .\scripts\download-news-images-auto.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host ""
    Write-Host "To get a token:" -ForegroundColor Yellow
    Write-Host "1. Go to https://www.figma.com/settings" -ForegroundColor White
    Write-Host "2. Scroll to 'Personal access tokens'" -ForegroundColor White
    Write-Host "3. Create a new token" -ForegroundColor White
    exit 1
}

Write-Host "🔍 Searching for news images in Figma..." -ForegroundColor Cyan
Write-Host ""

$headers = @{
    "X-Figma-Token" = $Token
}

# Function to recursively find image nodes
function Find-ImageNodes {
    param(
        [object]$node,
        [array]$imageNodes = @()
    )
    
    # Check if node is an image (has fills with image type)
    if ($node.type -eq "RECTANGLE" -or $node.type -eq "FRAME" -or $node.type -eq "COMPONENT") {
        if ($node.fills -and $node.fills.Count -gt 0) {
            foreach ($fill in $node.fills) {
                if ($fill.type -eq "IMAGE") {
                    $imageNodes += @{
                        id = $node.id
                        name = $node.name
                        node = $node
                    }
                    break
                }
            }
        }
    }
    
    # Recursively search children
    if ($node.children) {
        foreach ($child in $node.children) {
            $imageNodes = Find-ImageNodes -node $child -imageNodes $imageNodes
        }
    }
    
    return $imageNodes
}

try {
    # Get file structure
    Write-Host "Fetching file structure from Figma API..." -ForegroundColor Yellow
    $fileUrl = "https://api.figma.com/v1/files/$fileKey/nodes?ids=$parentNodeId"
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    if (-not $fileResponse.nodes.$parentNodeId) {
        Write-Host "❌ Could not find parent node $parentNodeId" -ForegroundColor Red
        exit 1
    }
    
    $parentNode = $fileResponse.nodes.$parentNodeId.document
    
    # Find all image nodes
    Write-Host "Searching for image nodes..." -ForegroundColor Yellow
    $imageNodes = Find-ImageNodes -node $parentNode
    
    if ($imageNodes.Count -eq 0) {
        Write-Host "⚠️  No image nodes found. Trying alternative approach..." -ForegroundColor Yellow
        
        # Alternative: Try to find frames that likely contain news images
        # Look for frames in the news grid area
        $allNodes = @()
        function GetAllNodes {
            param([object]$node, [array]$nodes = @())
            $nodes += $node
            if ($node.children) {
                foreach ($child in $node.children) {
                    $nodes = GetAllNodes -node $child -nodes $nodes
                }
            }
            return $nodes
        }
        
        $allNodes = GetAllNodes -node $parentNode
        $frameNodes = $allNodes | Where-Object { 
            $_.type -eq "FRAME" -and 
            ($_.name -like "*news*" -or $_.name -like "*карт*" -or $_.name -like "*image*" -or $_.name -like "*photo*")
        }
        
        if ($frameNodes.Count -gt 0) {
            Write-Host "Found $($frameNodes.Count) potential news card frames" -ForegroundColor Green
            $imageNodes = $frameNodes | Select-Object -First 6 | ForEach-Object {
                @{
                    id = $_.id
                    name = $_.name
                    node = $_
                }
            }
        }
    }
    
    if ($imageNodes.Count -eq 0) {
        Write-Host "❌ Could not automatically find image nodes." -ForegroundColor Red
        Write-Host ""
        Write-Host "Please manually find node IDs:" -ForegroundColor Yellow
        Write-Host "1. Open Figma Dev Mode: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1038-491&m=dev" -ForegroundColor White
        Write-Host "2. Select each news image" -ForegroundColor White
        Write-Host "3. Copy the node-id from the URL" -ForegroundColor White
        Write-Host "4. Update scripts/download-news-images.ps1 with the node IDs" -ForegroundColor White
        exit 1
    }
    
    Write-Host "✓ Found $($imageNodes.Count) image nodes" -ForegroundColor Green
    Write-Host ""
    
    # Limit to 6 images (as per design)
    $imageNodes = $imageNodes | Select-Object -First 6
    
    # Get node IDs
    $nodeIds = $imageNodes | ForEach-Object { $_.id }
    $nodeIdsString = $nodeIds -join ","
    
    # Get export URLs
    Write-Host "Requesting export URLs from Figma API..." -ForegroundColor Yellow
    $apiUrl = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsString&format=webp&scale=2"
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "✓ Got export URLs" -ForegroundColor Green
        Write-Host ""
        
        # Download each image
        $index = 1
        foreach ($imageNode in $imageNodes) {
            $nodeId = $imageNode.id
            $imageName = "news-$index"
            $imagePath = Join-Path $newsDir "$imageName.webp"
            
            if ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "Downloading $imageName ($($imageNode.name))..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "✓ Saved: $imageName.webp" -ForegroundColor Green
                } catch {
                    Write-Host "✗ Failed to download $imageName : $_" -ForegroundColor Red
                }
            } else {
                Write-Host "⚠️  No URL for node $nodeId ($imageName)" -ForegroundColor Yellow
            }
            
            $index++
        }
        
        Write-Host ""
        Write-Host "✨ Download complete!" -ForegroundColor Green
    } else {
        Write-Host "❌ No images in API response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json -Depth 5)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    exit 1
}

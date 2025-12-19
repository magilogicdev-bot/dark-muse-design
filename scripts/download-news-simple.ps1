param(
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

if (-not $Token) {
    Write-Host "❌ FIGMA_TOKEN is required" -ForegroundColor Red
    Write-Host "Usage: .\scripts\download-news-simple.ps1 -Token 'your-token'" -ForegroundColor White
    Write-Host "Or set: `$env:FIGMA_TOKEN = 'your-token'" -ForegroundColor White
    exit 1
}

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

Write-Host "Analyzing Figma file structure..." -ForegroundColor Cyan
Write-Host ""

try {
    $fileUrl = "https://api.figma.com/v1/files/$fileKey/nodes?ids=$parentNodeId"
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    if (-not $fileResponse.nodes.$parentNodeId) {
        Write-Host "Could not access parent node" -ForegroundColor Red
        exit 1
    }
    
    $parentNode = $fileResponse.nodes.$parentNodeId.document
    
    function Find-ImageContainers {
        param([object]$node, [array]$found = @())
        
        $hasImage = $false
        if ($node.fills) {
            foreach ($fill in $node.fills) {
                if ($fill.type -eq "IMAGE") {
                    $hasImage = $true
                    break
                }
            }
        }
        
        # Look for RECTANGLE nodes with images (these are usually the actual image containers)
        if ($hasImage -and $node.type -eq "RECTANGLE") {
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
        Write-Host "No image containers found" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Host "Found $($imageContainers.Count) total image containers" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "All found containers:" -ForegroundColor Cyan
    foreach ($img in $imageContainers) {
        Write-Host "  - $($img.id): $($img.name) (Type: $($img.type))" -ForegroundColor White
    }
    Write-Host ""
    
    # Try all RECTANGLE nodes, prioritizing those with numeric names (likely news images)
    $allRectangles = $imageContainers | Where-Object { $_.type -eq "RECTANGLE" }
    $newsImages = $allRectangles | Where-Object { 
        $_.name -match "^\d" -or $_.name -like "*421124421214*" -or $_.name -like "*Group*"
    } | Select-Object -First 6
    
    if ($newsImages.Count -lt 6) {
        $newsImages = $allRectangles | Select-Object -First 6
    }
    
    if ($newsImages.Count -lt 6) {
        Write-Host "Found only $($newsImages.Count) RECTANGLE images" -ForegroundColor Yellow
        Write-Host "Trying to use all found RECTANGLE nodes..." -ForegroundColor Yellow
    }
    
    Write-Host "Selected $($newsImages.Count) image nodes for export" -ForegroundColor Green
    Write-Host ""
    
    foreach ($img in $newsImages) {
        Write-Host "  - $($img.id): $($img.name)" -ForegroundColor White
    }
    Write-Host ""
    
    $nodeIds = $newsImages | ForEach-Object { $_.id }
    $nodeIdsString = $nodeIds -join ","
    
    Write-Host "Requesting export URLs..." -ForegroundColor Yellow
    # Convert node IDs from format "1038:501" to "1038-501" for API
    $nodeIdsForApi = $nodeIds | ForEach-Object { $_ -replace ":", "-" }
    $nodeIdsStringForApi = $nodeIdsForApi -join ","
    $apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=" + [System.Web.HttpUtility]::UrlEncode($nodeIdsStringForApi) + "&format=png&scale=2"
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "Got export URLs" -ForegroundColor Green
        Write-Host "Response keys: $($response.images.PSObject.Properties.Name -join ', ')" -ForegroundColor Gray
        Write-Host ""
        
        $index = 1
        $downloadedCount = 0
        foreach ($img in $newsImages) {
            $nodeId = $img.id
            $imageName = "news-$index"
            $imagePath = Join-Path $newsDir "$imageName.png"
            
            # Convert node ID format for API response lookup
            $nodeIdForApi = $nodeId -replace ":", "-"
            
            # Try both formats
            $imageUrl = $null
            if ($response.images.$nodeIdForApi) {
                $imageUrl = $response.images.$nodeIdForApi
            } elseif ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
            }
            
            if ($imageUrl) {
                Write-Host "[$index/$($newsImages.Count)] Downloading $imageName (node: $nodeId)..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "  Saved: $imageName.png" -ForegroundColor Green
                    $downloadedCount++
                } catch {
                    Write-Host "  Failed: $_" -ForegroundColor Red
                }
            } else {
                Write-Host "  No export URL for node $nodeId (tried: $nodeIdForApi and $nodeId)" -ForegroundColor Yellow
            }
            
            $index++
        }
        
        if ($downloadedCount -eq 0) {
            Write-Host ""
            Write-Host "No images were downloaded. Trying alternative node IDs..." -ForegroundColor Yellow
            # Try the other found nodes
            $altNodes = $imageContainers | Where-Object { $_.id -like "1054:*" } | Select-Object -First 6
            if ($altNodes.Count -gt 0) {
                Write-Host "Found $($altNodes.Count) alternative nodes, trying them..." -ForegroundColor Cyan
                $nodeIdsAlt = $altNodes | ForEach-Object { $_.id -replace ":", "-" }
                $nodeIdsStringAlt = $nodeIdsAlt -join ","
                $apiUrlAlt = "https://api.figma.com/v1/images/$fileKey?ids=$nodeIdsStringAlt&format=png&scale=2"
                $responseAlt = Invoke-RestMethod -Uri $apiUrlAlt -Headers $headers -Method Get
                
                if ($responseAlt.images) {
                    $index = 1
                    foreach ($img in $altNodes) {
                        $nodeId = $img.id
                        $nodeIdForApi = $nodeId -replace ":", "-"
                        $imageName = "news-$index"
                        $imagePath = Join-Path $newsDir "$imageName.png"
                        
                        if ($responseAlt.images.$nodeIdForApi) {
                            $imageUrl = $responseAlt.images.$nodeIdForApi
                            Write-Host "[$index] Downloading $imageName..." -ForegroundColor Yellow
                            try {
                                Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                                Write-Host "  Saved: $imageName.png" -ForegroundColor Green
                                $downloadedCount++
                            } catch {
                                Write-Host "  Failed: $_" -ForegroundColor Red
                            }
                        }
                        $index++
                    }
                }
            }
        }
        
        Write-Host ""
        Write-Host "Download complete! Images saved to: $newsDir" -ForegroundColor Green
    } else {
        Write-Host "No images in API response" -ForegroundColor Red
    }
    
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        if ($statusCode -eq 403) {
            Write-Host "Access denied. Check your Figma token." -ForegroundColor Red
        } elseif ($statusCode -eq 404) {
            Write-Host "File or node not found." -ForegroundColor Red
        }
    }
    exit 1
}

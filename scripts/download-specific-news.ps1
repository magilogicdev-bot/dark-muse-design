param(
    [string]$Token = $env:FIGMA_TOKEN
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$newsDir = Join-Path $projectRoot "public\images\news"

if (-not (Test-Path $newsDir)) {
    New-Item -ItemType Directory -Force -Path $newsDir | Out-Null
}

$fileKey = "dbhRRPEagcwqR97v2vLgAd"

# Specific node IDs from user's request
$nodeIds = @(
    "1038:504",  # Will be news-1
    "1038:503",  # Will be news-2
    "1038:506",  # Will be news-3
    "1038:507",  # Will be news-4
    "1038:505",  # Will be news-5
    "1038:508"   # Will be news-6
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
    Write-Host "Figma token is required!" -ForegroundColor Red
    Write-Host "Token should be in environment variable FIGMA_TOKEN" -ForegroundColor Yellow
    exit 1
}

$headers = @{
    "X-Figma-Token" = $Token
}

Write-Host "Downloading 6 specific news images from Figma..." -ForegroundColor Cyan
Write-Host ""

# Convert node IDs to API format (1038:504 -> 1038-504)
$nodeIdsForApi = $nodeIds | ForEach-Object { $_ -replace ":", "-" }
$nodeIdsStringForApi = $nodeIdsForApi -join ","

Write-Host "Node IDs: $nodeIdsStringForApi" -ForegroundColor Gray
Write-Host ""

try {
    Write-Host "Requesting export URLs from Figma API..." -ForegroundColor Yellow
    # Build URL properly
    $apiUrl = "https://api.figma.com/v1/images/" + $fileKey + "?ids=" + $nodeIdsStringForApi + "&format=png&scale=2"
    Write-Host "API URL: $apiUrl" -ForegroundColor Gray
    $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
    
    if ($response.images) {
        Write-Host "Got export URLs" -ForegroundColor Green
        Write-Host ""
        
        # Download each image
        for ($i = 0; $i -lt $nodeIds.Length; $i++) {
            $nodeId = $nodeIds[$i]
            $nodeIdForApi = $nodeId -replace ":", "-"
            $imageName = $imageNames[$i]
            $imagePath = Join-Path $newsDir "$imageName.png"
            
            if ($response.images.$nodeIdForApi) {
                $imageUrl = $response.images.$nodeIdForApi
                Write-Host "[$($i+1)/6] Downloading $imageName (node: $nodeId)..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "  Saved: $imageName.png" -ForegroundColor Green
                } catch {
                    Write-Host "  Failed: $_" -ForegroundColor Red
                }
            } elseif ($response.images.$nodeId) {
                $imageUrl = $response.images.$nodeId
                Write-Host "[$($i+1)/6] Downloading $imageName (node: $nodeId)..." -ForegroundColor Yellow
                
                try {
                    Invoke-WebRequest -Uri $imageUrl -OutFile $imagePath -UseBasicParsing
                    Write-Host "  Saved: $imageName.png" -ForegroundColor Green
                } catch {
                    Write-Host "  Failed: $_" -ForegroundColor Red
                }
            } else {
                Write-Host "  No export URL for node $nodeId (tried: $nodeIdForApi)" -ForegroundColor Yellow
            }
        }
        
        Write-Host ""
        Write-Host "Download complete! Images saved to: $newsDir" -ForegroundColor Green
    } else {
        Write-Host "No images in API response" -ForegroundColor Red
        Write-Host "Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
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
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    exit 1
}

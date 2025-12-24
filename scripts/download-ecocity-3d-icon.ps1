# PowerShell script to download 3D icon for Ecocity Hero section from Figma

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
    Write-Host "✓ Created images directory: $imagesDir" -ForegroundColor Green
}

# Figma file key and node ID
$fileKey = "PoqoKMYQJFXDIWo8qbsKsj"
$nodeId = "1080:7738"  # 3D icon button from Figma
$fileName = "3d-icon-button.png"

# Try to get token from mcp.json if not provided
if (-not $Token) {
    try {
        $mcpPath = Join-Path $env:USERPROFILE ".cursor\mcp.json"
        if (Test-Path $mcpPath) {
            $mcpContent = Get-Content $mcpPath | ConvertFrom-Json
            if ($mcpContent.servers -and $mcpContent.servers['figma-api']) {
                $args = $mcpContent.servers['figma-api'].args
                $apiKeyArg = $args | Where-Object { $_ -like '--figma-api-key=*' }
                if ($apiKeyArg) {
                    $Token = $apiKeyArg -replace '--figma-api-key=', ''
                }
            }
        }
    } catch {
        # Ignore errors
    }
}

Write-Host "📥 Downloading 3D icon from Figma..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Node ID: $nodeId" -ForegroundColor White
Write-Host "Figma URL: https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=1080-7738&m=dev" -ForegroundColor Gray
Write-Host ""

# Try API method if token is provided
if ($Token) {
    Write-Host "Using Figma API with provided token..." -ForegroundColor Yellow
    
    # Node ID with colon should work as-is in the API
    $apiUrl = "https://api.figma.com/v1/images/$fileKey" + "?ids=$nodeId&format=png&scale=2"
    $headers = @{
        "X-Figma-Token" = $Token
    }

    try {
        Write-Host "Requesting export URL from Figma API..." -ForegroundColor Yellow
        Write-Host "API URL: $apiUrl" -ForegroundColor Gray
        $response = Invoke-RestMethod -Uri $apiUrl -Headers $headers -Method Get
        
        if ($response.images -and $response.images.$nodeId) {
            $imageUrl = $response.images.$nodeId
            $filePath = Join-Path $imagesDir $fileName
            
            Write-Host "Downloading $fileName..." -ForegroundColor Yellow
            
            try {
                Invoke-WebRequest -Uri $imageUrl -OutFile $filePath -UseBasicParsing
                Write-Host "✓ Saved: $filePath" -ForegroundColor Green
                Write-Host ""
                Write-Host "✨ Download complete!" -ForegroundColor Green
                Write-Host "The icon has been saved to: public\images\$fileName" -ForegroundColor Cyan
                Write-Host "The component will use this icon automatically." -ForegroundColor Cyan
                exit 0
            } catch {
                Write-Host "✗ Failed to download $fileName : $_" -ForegroundColor Red
            }
        } else {
            Write-Host "⚠️  No URL for node $nodeId" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️  API request failed: $_" -ForegroundColor Yellow
        if ($_.Exception.Response.StatusCode -eq 403) {
            Write-Host "⚠️  Token might be expired or invalid." -ForegroundColor Red
            Write-Host "Please check your Figma token in ~/.cursor/mcp.json" -ForegroundColor Yellow
        }
        Write-Host "Falling back to manual download instructions..." -ForegroundColor Yellow
        Write-Host ""
    }
} else {
    Write-Host "⚠️  Figma token not provided" -ForegroundColor Yellow
    Write-Host ""
}

# Manual download instructions
Write-Host "📋 Manual Download Instructions:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Figma Dev Mode in your browser:" -ForegroundColor White
Write-Host "   https://www.figma.com/design/$fileKey/ALFA--Copy---Copy-?node-id=1080-7738&m=dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Steps to download:" -ForegroundColor White
Write-Host "   a) The 3D icon element should be selected automatically" -ForegroundColor Gray
Write-Host "   b) In the right panel, click Export or right-click and select Export" -ForegroundColor Gray
Write-Host "   c) Choose PNG format, scale 2x or 3x" -ForegroundColor Gray
Write-Host "   d) Save as: $fileName" -ForegroundColor Gray
Write-Host "   e) Place in: $imagesDir" -ForegroundColor Gray
Write-Host ""

# Check current status
$filePath = Join-Path $imagesDir $fileName
if (Test-Path $filePath) {
    Write-Host "📊 Current Status:" -ForegroundColor Yellow
    Write-Host "   ✓ $fileName exists" -ForegroundColor Green
    $fileInfo = Get-Item $filePath
    Write-Host "   Size: $([math]::Round($fileInfo.Length / 1KB, 2)) KB" -ForegroundColor Gray
    Write-Host "   Modified: $($fileInfo.LastWriteTime)" -ForegroundColor Gray
} else {
    Write-Host "📊 Current Status:" -ForegroundColor Yellow
    Write-Host "   ✗ $fileName missing" -ForegroundColor Red
    Write-Host ""
    Write-Host "⚠️  Please download the icon using the instructions above." -ForegroundColor Yellow
}
















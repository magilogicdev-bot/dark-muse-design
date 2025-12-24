# Script to find node IDs for Ecocity Hero section icons
# Searches for Scroll Down button, Location button, and 3D icon in Figma

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$fileKey = "PoqoKMYQJFXDIWo8qbsKsj"

# Try to get token from mcp.json
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

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Token will be read from:" -ForegroundColor Cyan
    Write-Host "  1. Environment variable FIGMA_TOKEN" -ForegroundColor White
    Write-Host "  2. Command line parameter: -Token 'your-token'" -ForegroundColor White
    Write-Host "  3. ~/.cursor/mcp.json (figma-api-key)" -ForegroundColor White
    exit 1
}

$headers = @{
    "X-Figma-Token" = $Token
}

Write-Host "🔍 Searching for Ecocity Hero icons in Figma..." -ForegroundColor Cyan
Write-Host ""

try {
    # Get file structure
    Write-Host "Fetching file structure from Figma API..." -ForegroundColor Yellow
    $fileUrl = "https://api.figma.com/v1/files/$fileKey"
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    if (-not $fileResponse.document) {
        Write-Host "❌ Could not get file structure" -ForegroundColor Red
        exit 1
    }
    
    # Function to recursively search nodes
    function Search-Nodes {
        param(
            [object]$node,
            [array]$results = @(),
            [int]$depth = 0
        )
        
        $indent = "  " * $depth
        
        # Search for icon-related nodes
        $nodeName = $node.name -replace '\s+', ' '
        $isIcon = $false
        $searchTerms = @('scroll', 'down', 'location', 'pin', 'map', '3d', 'icon', 'button', 'arrow', 'chevron')
        
        foreach ($term in $searchTerms) {
            if ($nodeName -match $term) {
                $isIcon = $true
                break
            }
        }
        
        # Check if it's a vector/component/instance (likely an icon)
        if ($node.type -in @('VECTOR', 'COMPONENT', 'INSTANCE', 'GROUP') -and $isIcon) {
            $results += @{
                id = $node.id
                name = $node.name
                type = $node.type
                depth = $depth
            }
            Write-Host "$indent✓ Found: $($node.name) ($($node.type)) - ID: $($node.id)" -ForegroundColor Green
        }
        
        # Recursively search children
        if ($node.children) {
            foreach ($child in $node.children) {
                $results = Search-Nodes -node $child -results $results -depth ($depth + 1)
            }
        }
        
        return $results
    }
    
    Write-Host "Searching for icon nodes..." -ForegroundColor Yellow
    Write-Host ""
    
    $foundIcons = Search-Nodes -node $fileResponse.document
    
    if ($foundIcons.Count -eq 0) {
        Write-Host "⚠️  No icons found automatically." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please find node IDs manually:" -ForegroundColor Yellow
        Write-Host "1. Open Figma Dev Mode:" -ForegroundColor White
        Write-Host "   https://www.figma.com/design/$fileKey/...?m=dev" -ForegroundColor Gray
        Write-Host "2. Select each icon element:" -ForegroundColor White
        Write-Host "   - Scroll Down button (orange button with arrow)" -ForegroundColor Gray
        Write-Host "   - Location button (circle button with pin icon)" -ForegroundColor Gray
        Write-Host "   - 3D icon button (if needed)" -ForegroundColor Gray
        Write-Host "3. Copy node-id from URL (format: XXXX:XXXX)" -ForegroundColor White
        Write-Host "4. Update scripts/download-ecocity-hero-icons.ps1" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "Found $($foundIcons.Count) potential icon nodes:" -ForegroundColor Green
        Write-Host ""
        
        # Group by likely type
        $scrollIcons = $foundIcons | Where-Object { 
            $_.name -match 'scroll|down|arrow|chevron' 
        } | Select-Object -First 3
        
        $locationIcons = $foundIcons | Where-Object { 
            $_.name -match 'location|pin|map|place' 
        } | Select-Object -First 3
        
        $icon3d = $foundIcons | Where-Object { 
            $_.name -match '3d|3D|three' 
        } | Select-Object -First 1
        
        Write-Host "Suggested node IDs:" -ForegroundColor Cyan
        Write-Host ""
        
        if ($scrollIcons.Count -gt 0) {
            Write-Host "Scroll Down icon candidates:" -ForegroundColor Yellow
            foreach ($icon in $scrollIcons) {
                Write-Host "  $($icon.id) - $($icon.name)" -ForegroundColor White
            }
            Write-Host ""
        }
        
        if ($locationIcons.Count -gt 0) {
            Write-Host "Location icon candidates:" -ForegroundColor Yellow
            foreach ($icon in $locationIcons) {
                Write-Host "  $($icon.id) - $($icon.name)" -ForegroundColor White
            }
            Write-Host ""
        }
        
        if ($icon3d) {
            Write-Host "3D icon candidate:" -ForegroundColor Yellow
            Write-Host "  $($icon3d.id) - $($icon3d.name)" -ForegroundColor White
            Write-Host ""
        }
        
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Verify these are the correct icons in Figma" -ForegroundColor White
        Write-Host "2. Update node IDs in scripts/download-ecocity-hero-icons.ps1" -ForegroundColor White
        Write-Host "3. Run: .\scripts\download-ecocity-hero-icons.ps1" -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please find node IDs manually in Figma Dev Mode." -ForegroundColor Yellow
}
















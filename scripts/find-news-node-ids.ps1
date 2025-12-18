# Script to help find node IDs for news images
# This script will try common node ID patterns based on the parent node

param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN
)

$fileKey = "dbhRRPEagcwqR97v2vLgAd"
$parentNodeId = "1038:491"

if (-not $Token) {
    Write-Host "❌ Figma token is required!" -ForegroundColor Red
    exit 1
}

$headers = @{
    "X-Figma-Token" = $Token
}

Write-Host "🔍 Fetching file structure to find news image node IDs..." -ForegroundColor Cyan
Write-Host ""

try {
    $fileUrl = "https://api.figma.com/v1/files/$fileKey/nodes?ids=$parentNodeId"
    $response = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    if ($response.nodes.$parentNodeId) {
        $node = $response.nodes.$parentNodeId.document
        
        Write-Host "Found parent node: $($node.name)" -ForegroundColor Green
        Write-Host ""
        Write-Host "Searching for image nodes..." -ForegroundColor Yellow
        
        # Function to find all nodes recursively
        function Get-AllNodes {
            param([object]$node, [int]$depth = 0)
            
            $indent = "  " * $depth
            $result = @()
            
            $nodeInfo = @{
                id = $node.id
                name = $node.name
                type = $node.type
                depth = $depth
            }
            
            # Check if it's likely an image container
            if ($node.type -eq "FRAME" -or $node.type -eq "RECTANGLE") {
                if ($node.fills -and $node.fills.Count -gt 0) {
                    foreach ($fill in $node.fills) {
                        if ($fill.type -eq "IMAGE") {
                            $nodeInfo.isImage = $true
                            break
                        }
                    }
                }
            }
            
            $result += $nodeInfo
            
            if ($node.children) {
                foreach ($child in $node.children) {
                    $result += Get-AllNodes -node $child -depth ($depth + 1)
                }
            }
            
            return $result
        }
        
        $allNodes = Get-AllNodes -node $node
        
        # Find potential image nodes
        $imageNodes = $allNodes | Where-Object { 
            $_.isImage -or 
            ($_.type -eq "FRAME" -and ($_.name -like "*image*" -or $_.name -like "*photo*" -or $_.name -like "*карт*"))
        }
        
        Write-Host "Potential image nodes found:" -ForegroundColor Green
        Write-Host ""
        
        $index = 1
        foreach ($imgNode in $imageNodes | Select-Object -First 10) {
            Write-Host "$index. Node ID: $($imgNode.id)" -ForegroundColor Cyan
            Write-Host "   Name: $($imgNode.name)" -ForegroundColor White
            Write-Host "   Type: $($imgNode.type)" -ForegroundColor Gray
            Write-Host ""
            $index++
        }
        
        if ($imageNodes.Count -gt 0) {
            Write-Host "Copy these node IDs to scripts/download-news-images.ps1" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}

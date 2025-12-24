# PowerShell script to get Figma file structure and find node IDs
param(
    [Parameter(Mandatory=$false)]
    [string]$Token = $env:FIGMA_TOKEN,
    [Parameter(Mandatory=$false)]
    [string]$FileKey = "HKJCXfKmo3ptpjTU8NW5ce"
)

$ErrorActionPreference = "Continue"

Write-Host "🔍 Getting Figma file structure..." -ForegroundColor Cyan
Write-Host ""

$headers = @{
    "X-Figma-Token" = $Token
}

$fileUrl = "https://api.figma.com/v1/files/$FileKey"

try {
    $fileResponse = Invoke-RestMethod -Uri $fileUrl -Headers $headers -Method Get
    
    Write-Host "✓ Successfully retrieved file structure" -ForegroundColor Green
    Write-Host ""
    
    # Save full response to JSON file for inspection
    $jsonPath = Join-Path (Split-Path -Parent $PSScriptRoot) "figma-file-structure.json"
    $fileResponse | ConvertTo-Json -Depth 10 | Out-File -FilePath $jsonPath -Encoding UTF8
    Write-Host "✓ Saved full structure to: figma-file-structure.json" -ForegroundColor Green
    Write-Host ""
    
    # Try to find the contacts page node (1114:10692)
    Write-Host "Looking for contacts page node (1114:10692)..." -ForegroundColor Yellow
    
    function FindNode($node, $targetId) {
        if ($node.id -eq $targetId) {
            return $node
        }
        if ($node.children) {
            foreach ($child in $node.children) {
                $found = FindNode $child $targetId
                if ($found) {
                    return $found
                }
            }
        }
        return $null
    }
    
    $contactsNode = FindNode $fileResponse.document "1114:10692"
    
    if ($contactsNode) {
        Write-Host "✓ Found contacts page node!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Node name: $($contactsNode.name)" -ForegroundColor White
        Write-Host "Node type: $($contactsNode.type)" -ForegroundColor White
        Write-Host ""
        
        if ($contactsNode.children) {
            Write-Host "Children nodes:" -ForegroundColor Cyan
            foreach ($child in $contactsNode.children) {
                Write-Host "  - $($child.name) (ID: $($child.id), Type: $($child.type))" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "⚠️  Could not find contacts page node 1114:10692" -ForegroundColor Yellow
        Write-Host "   Try searching in the JSON file manually" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "❌ Error getting file structure: $_" -ForegroundColor Red
    Write-Host "   Error details: $($_.Exception.Message)" -ForegroundColor Gray
}

Write-Host ""
Write-Host "💡 Tip: Open figma-file-structure.json to explore the full file structure" -ForegroundColor Cyan


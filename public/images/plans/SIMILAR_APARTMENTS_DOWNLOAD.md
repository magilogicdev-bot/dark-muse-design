# Download Similar Apartments Floor Plans

This directory should contain 3 floor plan images for the Similar Apartments section:

- `similar-apartment-1.png` - First apartment plan (node-id: 1090:8417)
- `similar-apartment-2.png` - Second apartment plan (node-id: 1090:8418)
- `similar-apartment-3.png` - Third apartment plan (node-id: 1090:8419)

## Download via Script

Run the Node.js script (token is read from `~/.cursor/mcp.json`):

```bash
node scripts/download-similar-apartments-plans.cjs
```

Токен должен быть настроен в `~/.cursor/mcp.json`:
```json
{
  "servers": {
    "figma-api": {
      "command": "npx",
      "args": [
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=YOUR_TOKEN",
        "--stdio"
      ]
    }
  }
}
```

## Manual Download from Figma

1. Open Figma: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-

2. For each plan:
   - Navigate to the node ID in Dev Mode
   - Select the floor plan element
   - Right-click → Export or use Export in the right panel
   - Choose PNG format, scale 2x
   - Save as `similar-apartment-{1,2,3}.png` in this directory

Direct links:
- Plan 1: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8417&m=dev
- Plan 2: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8418&m=dev
- Plan 3: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8419&m=dev


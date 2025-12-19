# Bank Logos

This directory should contain 4 bank logo images for the Mortgage Banks Section:

- `sberbank-logo.png` - Sberbank logo (node-id: 1090:8384)
- `vtb-logo.png` - VTB logo (node-id: 5023:4)
- `alfabank-logo.png` - Alfa-Bank logo (node-id: 1090:8364)
- `promsvyazbank-logo.png` - Promsvyazbank logo (node-id: 1090:8354)

## Download Instructions

The logos can be downloaded using the script:

```bash
node scripts/download-bank-logos.cjs
```

The script will automatically read the Figma token from `~/.cursor/mcp.json` (figma-api-key).

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

If the token is expired, you can download manually:

1. Open Figma: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-

2. For each logo:
   - Navigate to the node ID in Dev Mode
   - Select the logo element
   - Right-click → Export or use Export in the right panel
   - Choose PNG format, scale 2x
   - Save with the corresponding filename in this directory

Direct links:
- Sberbank: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8384&m=dev
- VTB: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=5023-4&m=dev
- Alfa-Bank: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8364&m=dev
- Promsvyazbank: https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8354&m=dev

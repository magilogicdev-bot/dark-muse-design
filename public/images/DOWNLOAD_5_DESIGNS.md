# Download 5 Designs from Figma

This document explains how to download the 5 designs from Figma that were requested.

## Node IDs and Files

The following designs need to be downloaded:

1. **Node 5023:5** → `design-5023-5.png` (Abstract icon - two interlocking shapes)
2. **Node 5023:4** → `design-5023-4.png` (Alfa Bank logo - red "A")
3. **Node 1090:8364** → `design-1090-8364.png` (Bank logo - blue "E" shape, likely Promsvyazbank)
4. **Node 1090:8354** → `design-1090-8354.png` (Checkmark with gradient circle - feature icon)
5. **Node 1090:8355** → `design-1090-8355.png` (Green checkmark - feature icon)

## Download Methods

### Method 1: PowerShell Script (Recommended)

Run the PowerShell script with your Figma token:

```powershell
.\scripts\download-figma-5-designs.ps1 -Token "your-figma-token"
```

Or set the environment variable:

```powershell
$env:FIGMA_TOKEN = "your-figma-token"
.\scripts\download-figma-5-designs.ps1
```

### Method 2: Manual Download from Figma

1. Open Figma in your browser:
   - File: `PoqoKMYQJFXDIWo8qbsKsj`
   - URLs:
     - https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=5023-5&m=dev
     - https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=5023-4&m=dev
     - https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8364&m=dev
     - https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8354&m=dev
     - https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/ALFA--Copy---Copy-?node-id=1090-8355&m=dev

2. For each design:
   - Select the element in Figma
   - In the right panel, click "Export" or right-click and select "Export"
   - Choose PNG format, scale 2x
   - Save as the corresponding filename in `public/images/`

## Usage in Components

The designs are integrated into `MortgageBanksSection.vue`:

- **Bank logos** (5023:4, 1090:8364) are used as `figmaLogo` in bank cards
- **Feature icons** (1090:8354, 1090:8355) are available in the `featureIcons` object for future use

The component will automatically fall back to existing logos if Figma logos are not found.


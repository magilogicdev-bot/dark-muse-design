# Ecocity Hero Section Icons

This directory should contain icons for the Ecocity Hero section:

1. `ecocity-scroll-down.png` - Scroll Down icon (orange button)
2. `ecocity-location.png` - Location icon (circle button)
3. `ecocity-3d.png` - 3D icon button (optional, if different from existing 3d-icon-button.png)

## Download Instructions

### Step 1: Find Node IDs in Figma

1. Open Figma Dev Mode for Ecocity design:
   ```
   https://www.figma.com/design/PoqoKMYQJFXDIWo8qbsKsj/...?m=dev
   ```

2. Navigate to the Hero section and select each icon:
   - **Scroll Down button**: Orange circular button with arrow/chevron icon
   - **Location button**: Circle button with location/pin icon
   - **3D icon button**: (if different from existing one)

3. For each icon:
   - Node ID will be visible in the URL after `node-id=`
   - Or check the Dev Mode panel on the right side
   - Copy the node-id (format: `XXXX:XXXX`)

### Step 2: Update Script with Node IDs

Open `scripts/download-ecocity-hero-icons.ps1` and update the `$nodeIds` array:

```powershell
$nodeIds = @(
    "1080:1234",  # Scroll Down icon (orange button) - REPLACE WITH ACTUAL NODE ID
    "1080:5678",  # Location icon (circle button) - REPLACE WITH ACTUAL NODE ID
    "1080:9012"   # 3D icon button - REPLACE WITH ACTUAL NODE ID (optional)
)
```

### Step 3: Download Icons

Run the download script:

```powershell
.\scripts\download-ecocity-hero-icons.ps1
```

The script will automatically read the Figma token from `~/.cursor/mcp.json`.

**Alternative:** Use the Node.js version:
```powershell
node scripts/download-ecocity-hero-icons.cjs
```

### Step 4: Verify Icons

After downloading, verify the icons exist:
```powershell
Get-ChildItem public\images\icons\ecocity-*.png
```

All icons should be present:
- ✓ `ecocity-scroll-down.png`
- ✓ `ecocity-location.png`
- ✓ `ecocity-3d.png` (if needed)

## Automatic Node ID Search

You can try to find node IDs automatically:

```powershell
.\scripts\find-ecocity-hero-icons.ps1
```

This script will search the Figma file structure for potential icon nodes.

## Icon Specifications

- **Format**: PNG
- **Scale**: 2x or 3x (for retina displays)
- **Background**: Transparent
- **Size**: Optimized for 52x52px (Scroll Down) and 56x56px (Location/3D) buttons

## Current Status

Check which icons are missing:
```powershell
.\scripts\download-ecocity-hero-icons.ps1
```

The script will show the current status of all required icons.

## Fallback Icons

If `ecocity-scroll-down.png` is not found, the component will automatically use `chevron-down.png` as a fallback.












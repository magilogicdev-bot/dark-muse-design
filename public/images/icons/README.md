# Figma Icons - Chalk Style

This directory should contain 4 chalk-style icons from Figma:

1. `whatsapp.png` - WhatsApp icon (node-id: 1054-4896)
2. `telegram.png` - Telegram/Paper Plane icon (node-id: 1054-4897)
3. `phone-handset.png` - Phone icon (node-id: 1054-4895)
4. `chevron-down.png` - Chevron Down icon (node-id: 1054-4894)

## Download Instructions

### Option 1: Using Figma API (Recommended)

1. Get your Figma Personal Access Token:
   - Go to https://www.figma.com/settings
   - Scroll to "Personal access tokens"
   - Create a new token

2. Run the download script:
   ```powershell
   $env:FIGMA_TOKEN = "your-token-here"
   .\scripts\download-figma-icons-api.ps1
   ```

   Or pass token as parameter:
   ```powershell
   .\scripts\download-figma-icons-api.ps1 -Token "your-token-here"
   ```

### Option 2: Manual Download from Figma

1. Open each icon in Figma Dev Mode:
   - WhatsApp: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4896&m=dev
   - Telegram: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4897&m=dev
   - Phone: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4895&m=dev
   - Chevron: https://www.figma.com/design/dbhRRPEagcwqR97v2vLgAd/ALFA-12.15?node-id=1054-4894&m=dev

2. For each icon:
   - Select the icon element
   - Right-click → Export or use Export panel
   - Choose PNG format, scale 2x or 3x
   - Save with the correct filename in this directory

## Icon Specifications

- Format: PNG
- Scale: 2x or 3x (for retina displays)
- Style: Chalk-drawn aesthetic with orange scribbles
- Background: Transparent (icons have their own dark circular background)

## Usage

The icons are used in `components/FloatingActionBar.vue` component.

// Download Ecocity About section images from Figma
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const fileKey = 'PoqoKMYQJFXDIWo8qbsKsj';
// Node IDs from Figma URLs
const nodeIds = [
  '1080-7609',  // Main building image (large, left)
  '1080-7690',  // Courtyard image (top-left small)
  '1080-7689',  // Playground image (top-right small)
  '1080-7693',  // Facade detail image (bottom-left small)
  '1080-7691',  // Gallery image with overlay (bottom-right small)
  '1080-7575'   // Main section (for reference, might not need image)
];

const fileNames = [
  'ecocity-about-main.png',
  'ecocity-about-courtyard.png',
  'ecocity-about-playground.png',
  'ecocity-about-facade.png',
  'ecocity-about-gallery.png',
  'ecocity-about-section.png'
];

// Function to load token from mcp.json
function getFigmaToken() {
  // 1. Command line argument
  if (process.argv[2]) {
    return process.argv[2];
  }
  
  // 2. Environment variable
  if (process.env.FIGMA_TOKEN) {
    return process.env.FIGMA_TOKEN;
  }
  
  // 3. Try to read from .env file
  const envPath = path.join(projectRoot, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envLines = envContent.split('\n');
      for (const line of envLines) {
        const match = line.match(/^FIGMA_TOKEN\s*=\s*(.+)$/);
        if (match) {
          return match[1].trim().replace(/^["']|["']$/g, '');
        }
      }
    } catch (err) {
      // Ignore .env read errors
    }
  }
  
  // 4. Try to read from mcp.json (if exists in user's home directory)
  try {
    const mcpPath = path.join(os.homedir(), '.cursor', 'mcp.json');
    if (fs.existsSync(mcpPath)) {
      const mcpContent = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
      // Check for figma-api-key in servers config
      if (mcpContent.servers && mcpContent.servers['figma-api']) {
        const args = mcpContent.servers['figma-api'].args || [];
        const apiKeyArg = args.find(arg => arg && arg.startsWith('--figma-api-key='));
        if (apiKeyArg) {
          return apiKeyArg.split('=')[1];
        }
      }
      // Also check for figma-desktop
      if (mcpContent.servers && mcpContent.servers['figma-desktop']) {
        const args = mcpContent.servers['figma-desktop'].args || [];
        const apiKeyArg = args.find(arg => arg && arg.startsWith('--figma-api-key='));
        if (apiKeyArg) {
          return apiKeyArg.split('=')[1];
        }
      }
    }
  } catch (err) {
    // Ignore mcp.json read errors
  }
  
  return null;
}

const token = getFigmaToken();

if (!token) {
  console.error('❌ FIGMA_TOKEN is required');
  console.error('');
  console.error('Token will be read from:');
  console.error('  1. Command line argument');
  console.error('  2. Environment variable FIGMA_TOKEN');
  console.error('  3. .env file in project root');
  console.error('  4. ~/.cursor/mcp.json (figma-api-key)');
  process.exit(1);
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

function getImageUrl(nodeId) {
  // Convert node-id format (e.g., "1080-7609" to "1080:7609")
  const normalizedNodeId = nodeId.replace('-', ':');
  return `https://api.figma.com/v1/images/${fileKey}?ids=${normalizedNodeId}&format=png&scale=2`;
}

async function downloadImages() {
  console.log('📥 Downloading Ecocity About section images from Figma...\n');
  
  // Download only first 5 images (skip the section reference)
  for (let i = 0; i < 5; i++) {
    const nodeId = nodeIds[i];
    const fileName = fileNames[i];
    const filePath = path.join(imagesDir, fileName);
    
    try {
      console.log(`📸 Downloading ${fileName}...`);
      
      const imageUrl = getImageUrl(nodeId);
      const options = {
        headers: {
          'X-Figma-Token': token
        }
      };
      
      const response = await new Promise((resolve, reject) => {
        https.get(imageUrl, options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`API Error: ${res.statusCode} - ${data}`));
            }
          });
        }).on('error', reject);
      });
      
      if (response.images && response.images[nodeId.replace('-', ':')]) {
        const downloadUrl = response.images[nodeId.replace('-', ':')];
        await downloadFile(downloadUrl, filePath);
        console.log(`✅ Downloaded: ${fileName}\n`);
      } else {
        console.error(`❌ No image URL found for node ${nodeId}\n`);
      }
    } catch (error) {
      console.error(`❌ Error downloading ${fileName}:`, error.message);
      console.error('');
    }
  }
  
  console.log('✨ Done!');
}

downloadImages().catch(console.error);


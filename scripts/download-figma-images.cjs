// Universal script to download images from Figma
// Usage: node download-figma-images.cjs <node-id-1> <node-id-2> ... [output-dir]
// Or: node download-figma-images.cjs --file <file-key> --nodes <node-id-1,node-id-2> --output <dir>
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectRoot = path.resolve(__dirname, '..');
const defaultImagesDir = path.join(projectRoot, 'public', 'images');

// Function to load token from multiple sources
function getFigmaToken() {
  // 1. Command line argument (--token)
  const tokenIndex = process.argv.indexOf('--token');
  if (tokenIndex !== -1 && process.argv[tokenIndex + 1]) {
    return process.argv[tokenIndex + 1];
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

function normalizeNodeId(nodeId) {
  // Convert "1080-7609" to "1080:7609"
  return nodeId.replace('-', ':');
}

async function downloadFigmaImages(fileKey, nodeIds, outputDir, fileNames = null) {
  const token = getFigmaToken();
  
  if (!token) {
    console.error('❌ FIGMA_TOKEN is required');
    console.error('');
    console.error('Token will be read from:');
    console.error('  1. --token command line argument');
    console.error('  2. Environment variable FIGMA_TOKEN');
    console.error('  3. .env file in project root');
    console.error('  4. ~/.cursor/mcp.json (figma-api-key)');
    process.exit(1);
  }
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log(`📥 Downloading ${nodeIds.length} image(s) from Figma...\n`);
  
  // Request all images at once
  const normalizedNodeIds = nodeIds.map(normalizeNodeId);
  const nodeIdsString = normalizedNodeIds.join(',');
  const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeIdsString}&format=png&scale=2`;
  
  const options = {
    headers: {
      'X-Figma-Token': token
    }
  };
  
  try {
    const response = await new Promise((resolve, reject) => {
      https.get(apiUrl, options, (res) => {
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
    
    if (!response.images) {
      console.error('❌ No images in API response');
      process.exit(1);
    }
    
    let downloaded = 0;
    for (let i = 0; i < nodeIds.length; i++) {
      const nodeId = nodeIds[i];
      const normalizedId = normalizeNodeId(nodeId);
      const fileName = fileNames ? fileNames[i] : `figma-${normalizedId.replace(':', '-')}.png`;
      const filePath = path.join(outputDir, fileName);
      
      if (response.images[normalizedId]) {
        const downloadUrl = response.images[normalizedId];
        console.log(`📸 Downloading ${fileName}...`);
        
        try {
          await downloadFile(downloadUrl, filePath);
          console.log(`✅ Downloaded: ${fileName}\n`);
          downloaded++;
        } catch (error) {
          console.error(`❌ Error downloading ${fileName}: ${error.message}\n`);
        }
      } else {
        console.error(`⚠️  No image URL found for node ${nodeId}\n`);
      }
    }
    
    console.log(`✨ Downloaded ${downloaded} of ${nodeIds.length} images`);
  } catch (error) {
    console.error(`❌ API Error: ${error.message}`);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log('Usage:');
  console.log('  node download-figma-images.cjs --file <file-key> --nodes <node-id-1,node-id-2> [--output <dir>] [--names <name1,name2>] [--token <token>]');
  console.log('');
  console.log('Examples:');
  console.log('  node download-figma-images.cjs --file PoqoKMYQJFXDIWo8qbsKsj --nodes 1080-7609,1080-7690');
  console.log('  node download-figma-images.cjs --file PoqoKMYQJFXDIWo8qbsKsj --nodes 1080-7609 --output public/images --names main.png');
  process.exit(0);
}

const fileIndex = args.indexOf('--file');
const nodesIndex = args.indexOf('--nodes');
const outputIndex = args.indexOf('--output');
const namesIndex = args.indexOf('--names');

if (fileIndex === -1 || nodesIndex === -1) {
  console.error('❌ --file and --nodes are required');
  process.exit(1);
}

const fileKey = args[fileIndex + 1];
const nodeIdsString = args[nodesIndex + 1];
const nodeIds = nodeIdsString.split(',').map(id => id.trim());
const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : defaultImagesDir;
const fileNames = namesIndex !== -1 ? args[namesIndex + 1].split(',').map(name => name.trim()) : null;

downloadFigmaImages(fileKey, nodeIds, outputDir, fileNames).catch(console.error);

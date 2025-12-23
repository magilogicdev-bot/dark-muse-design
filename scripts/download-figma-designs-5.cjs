// Download 5 designs from Figma
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectRoot = path.resolve(__dirname, '..');
const banksDir = path.join(projectRoot, 'public', 'images', 'banks');

if (!fs.existsSync(banksDir)) {
  fs.mkdirSync(banksDir, { recursive: true });
}

const fileKey = 'PoqoKMYQJFXDIWo8qbsKsj';
const nodeIds = ['5023:5', '5023:4', '1090:8364', '1090:8354', '1090:8355'];
const fileNames = ['design-1.png', 'design-2.png', 'design-3.png', 'design-4.png', 'design-5.png'];

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
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

function makeRequest(url, headers) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: headers
    };
    
    const req = protocol.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Invalid JSON response'));
          }
        } else {
          reject(new Error(`API request failed: ${res.statusCode} - ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('📥 Downloading 5 designs from Figma...\n');
  
  const idsParam = nodeIds.join(',');
  const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=png&scale=2`;
  const headers = {
    'X-Figma-Token': token
  };
  
  try {
    console.log('Requesting export URLs from Figma API...');
    const response = await makeRequest(apiUrl, headers);
    
    if (response.images) {
      for (let i = 0; i < nodeIds.length; i++) {
        const nodeId = nodeIds[i];
        const imageUrl = response.images[nodeId];
        
        if (imageUrl) {
          const filePath = path.join(banksDir, fileNames[i]);
          console.log(`Downloading ${fileNames[i]}...`);
          await downloadFile(imageUrl, filePath);
          console.log(`✓ Saved: ${fileNames[i]}`);
        } else {
          console.error(`❌ No URL for node ${nodeId}`);
        }
      }
      console.log('\n✨ Download complete!');
    } else {
      console.error('❌ No images in response');
    }
  } catch (err) {
    console.error('❌ API request failed:', err.message);
    process.exit(1);
  }
}

main().catch(console.error);

















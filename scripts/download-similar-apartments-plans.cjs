// Download 3 similar apartment plans from Figma
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const plansDir = path.join(projectRoot, 'public', 'images', 'plans');

if (!fs.existsSync(plansDir)) {
  fs.mkdirSync(plansDir, { recursive: true });
}

const fileKey = 'PoqoKMYQJFXDIWo8qbsKsj';
const nodeIds = ['1090:8417', '1090:8418', '1090:8419'];

// Function to load token from multiple sources
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
    const os = require('os');
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
  console.error('Options to provide token:');
  console.error('  1. Command line: node scripts/download-similar-apartments-plans.cjs [FIGMA_TOKEN]');
  console.error('  2. Environment variable: FIGMA_TOKEN=your-token node scripts/download-similar-apartments-plans.cjs');
  console.error('  3. .env file: Create .env in project root with: FIGMA_TOKEN=your-token');
  console.error('  4. mcp.json: Token will be read from ~/.cursor/mcp.json if configured');
  console.error('');
  console.error('To get a token:');
  console.error('  1. Go to https://www.figma.com/settings');
  console.error('  2. Scroll to "Personal access tokens"');
  console.error('  3. Create a new token');
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
  console.log('📥 Downloading 3 similar apartment plans from Figma...\n');
  
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
          const planPath = path.join(plansDir, `similar-apartment-${i + 1}.png`);
          console.log(`Downloading plan ${i + 1}...`);
          await downloadFile(imageUrl, planPath);
          console.log(`✓ Saved: similar-apartment-${i + 1}.png`);
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


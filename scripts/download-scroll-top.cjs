// Download scroll to top icon from Figma
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const iconsDir = path.join(projectRoot, 'public', 'images', 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const fileKey = 'dbhRRPEagcwqR97v2vLgAd';
const nodeId = '1044:3530';
const token = process.argv[2] || process.env.FIGMA_TOKEN;

if (!token) {
  console.error('❌ FIGMA_TOKEN is required');
  console.error('Usage: node scripts/download-scroll-top.cjs [FIGMA_TOKEN]');
  console.error('Or set: FIGMA_TOKEN=your-token node scripts/download-scroll-top.cjs');
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
        fs.unlinkSync(filepath);
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
  console.log('📥 Downloading scroll to top icon from Figma...\n');
  
  const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeId}&format=png&scale=3`;
  const headers = {
    'X-Figma-Token': token
  };
  
  try {
    console.log('Requesting export URL from Figma API...');
    const response = await makeRequest(apiUrl, headers);
    
    if (response.images && response.images[nodeId]) {
      const imageUrl = response.images[nodeId];
      const iconPath = path.join(iconsDir, 'scroll-to-top.png');
      
      console.log('Downloading scroll-to-top icon...');
      await downloadFile(imageUrl, iconPath);
      console.log('✓ Saved: scroll-to-top.png\n');
      console.log('✨ Download complete!');
    } else {
      console.error('❌ No URL for node', nodeId);
    }
  } catch (err) {
    console.error('❌ API request failed:', err.message);
    process.exit(1);
  }
}

main().catch(console.error);

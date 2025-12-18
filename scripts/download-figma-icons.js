// Node.js script to download Figma icons using Figma API
// Usage: node scripts/download-figma-icons.js [FIGMA_TOKEN]
// Or set FIGMA_TOKEN environment variable

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const iconsDir = path.join(projectRoot, 'public', 'images', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Figma file key and node IDs
const fileKey = 'dbhRRPEagcwqR97v2vLgAd';
const nodeIds = [
  '1054:4895',  // Phone
  '1054:4897',  // Telegram
  '1054:4896',  // WhatsApp
  '1054:4894'   // Chevron Down
];

const iconNames = [
  'phone-handset',
  'telegram',
  'whatsapp',
  'chevron-down'
];

const token = process.argv[2] || process.env.FIGMA_TOKEN;

if (!token) {
  console.error('❌ Figma token is required!');
  console.error('');
  console.error('Usage: node scripts/download-figma-icons.js [FIGMA_TOKEN]');
  console.error('Or set: FIGMA_TOKEN=your-token node scripts/download-figma-icons.js');
  console.error('');
  console.error('To get a token:');
  console.error('1. Go to https://www.figma.com/settings');
  console.error('2. Scroll to "Personal access tokens"');
  console.error('3. Create a new token');
  process.exit(1);
}

// Function to download file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
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

// Function to make API request
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

// Main function
async function main() {
  console.log('📥 Downloading Figma icons using API...\n');
  
  const nodeIdsString = nodeIds.join(',');
  const apiUrl = `https://api.figma.com/v1/images/${fileKey}?ids=${nodeIdsString}&format=png&scale=2`;
  const headers = {
    'X-Figma-Token': token
  };
  
  try {
    console.log('Requesting export URLs from Figma API...');
    const response = await makeRequest(apiUrl, headers);
    
    if (response.images) {
      console.log('✓ Got export URLs\n');
      
      // Download each image
      for (let i = 0; i < nodeIds.length; i++) {
        const nodeId = nodeIds[i];
        const iconName = iconNames[i];
        const iconPath = path.join(iconsDir, `${iconName}.png`);
        
        if (response.images[nodeId]) {
          const imageUrl = response.images[nodeId];
          console.log(`Downloading ${iconName}...`);
          
          try {
            await downloadFile(imageUrl, iconPath);
            console.log(`✓ Saved: ${iconName}.png`);
          } catch (err) {
            console.error(`✗ Failed to download ${iconName}: ${err.message}`);
          }
        } else {
          console.warn(`⚠️  No URL for node ${nodeId} (${iconName})`);
        }
      }
      
      console.log('\n✨ Download complete!');
    } else {
      console.error('❌ No images in API response');
      console.error('Response:', JSON.stringify(response, null, 2));
    }
  } catch (err) {
    console.error('❌ API request failed:', err.message);
    process.exit(1);
  }
}

main().catch(console.error);










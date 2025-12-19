// Utility function to get Figma token from multiple sources
// Can be required by other scripts: const getFigmaToken = require('./utils/get-figma-token.cjs')
const fs = require('fs');
const path = require('path');
const os = require('os');

function getFigmaToken(projectRoot) {
  // 1. Command line argument (if passed as process.argv[2] in calling script)
  // This is handled by the calling script
  
  // 2. Environment variable
  if (process.env.FIGMA_TOKEN) {
    return process.env.FIGMA_TOKEN;
  }
  
  // 3. Try to read from .env file
  if (projectRoot) {
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

module.exports = getFigmaToken;

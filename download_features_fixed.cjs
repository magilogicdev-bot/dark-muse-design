const https = require('https');
const fs = require('fs');
const path = require('path');

const token = 'figd_HhuRzphcy7wi48B6sDH02L_CM3waL3LXZJetSzOj';
const fileKey = 'oro3fwFD2J0bvUHa22SJP3';
const outDir = path.join(__dirname, 'public', 'images', 'ecocity2');

// Mapped from text analysis
const imageMap = {
    'features_playgrounds': '1125:16280',
    'features_nature': '1125:16283',
    'features_courtyard': '1125:16286',
    'features_safety': '1125:16289'
};

const nodeIds = Object.values(imageMap).join(',');

const options = {
    hostname: 'api.figma.com',
    path: `/v1/images/${fileKey}?ids=${nodeIds}&format=png&scale=2`, // Using correct endpoint
    headers: { 'X-Figma-Token': token }
};

console.log('Fetching image URLs...');
https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
        const json = JSON.parse(data);

        if (json.err) {
            console.error('Error:', json.err);
            return;
        }

        const images = json.images; // Map of NodeID -> URL

        for (const [name, nodeId] of Object.entries(imageMap)) {
            const url = images[nodeId];
            if (!url) {
                console.log(`No URL found for ${name} (${nodeId})`);
                continue;
            }

            const filePath = path.join(outDir, `${name}.png`);
            console.log(`Downloading ${name}...`);

            await new Promise((resolve, reject) => {
                https.get(url, (response) => {
                    const file = fs.createWriteStream(filePath);
                    response.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                }).on('error', reject);
            });
        }
        console.log('Done!');
    });
});

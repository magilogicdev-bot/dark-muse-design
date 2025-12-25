const https = require('https');
const fs = require('fs');
const path = require('path');

const token = 'figd_HhuRzphcy7wi48B6sDH02L_CM3waL3LXZJetSzOj';
const fileKey = 'oro3fwFD2J0bvUHa22SJP3';
const outDir = path.join(__dirname, 'public', 'images', 'ecocity2');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Correct image refs based on Figma structure
const imageMap = {
    'hero': '16a97598f0b3ff02f46eb2a5d484cca947a91848',           // Rectangle 803 - hero bg
    'about-main': '1d0880f636c07eab99d6e95ee3565c9b6c3a344a',     // image 53 - main left image
    'about-2': 'b6e58861f0665894476bf2c9c71387667bd4ac19',        // image 54 - top left grid
    'about-3': '93fcc116a61e672eea3cdf70f861a1301e19f103',        // image 54 - top right grid (tennis)
    'about-4': '3e14ea299c1eb8c0e16f7bc8008ced59aa7b51f1',        // image 56 - bottom left (interior)
    'about-gallery': '273e080e8acc2fa5bcd7f629b8dd3518f0e16e05',  // HIGH LIFE frame with gallery
    'feature-1': 'e7d946d061a8a372996374dd3a36f15134d8da4d',      // Без имени-4
    'feature-2': '715f87588a7346b55ec4009b3e140d63a1b3b31d',      // Без имени-5
    'feature-3': '72063ad7d084c67fa15c7827b8fc4a85c4fd3855',      // 241215216
    'feature-4': '87324d854c8f011feaf7831ff9eda6422ee275c7',      // Без имени-6
    'news-1': '862380c6a45e4b98f2e16ebf7c002544376e73e3',         // Rectangle 1033
    'news-2': '2b9684c1a6e3c0c1e76a766bf50c58725cf367fa',         // Rectangle 1037
    'news-3': '7496c16a6da114fc6abc42b48703c38411c89fd8',         // Rectangle 1038
    'general-plan': 'a827d14c4c8566261b0cba6d52fa80e79292303f'    // image 166
};

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${fileKey}/images`,
    headers: { 'X-Figma-Token': token }
};

https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
        const json = JSON.parse(data);

        if (json.error) {
            console.error('API Error:', json.error);
            return;
        }

        const images = json.meta.images;

        for (const [name, ref] of Object.entries(imageMap)) {
            const url = images[ref];
            if (!url) {
                console.log(`No URL for ${name} (${ref})`);
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
        console.log('Done! Images saved to', outDir);
    });
});

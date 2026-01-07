const fs = require('fs');

const rawData = `
5 167 050 54.4 м² 2 1 В продаже 1 1
6 355 620 68.3 м² 2 1 В продаже 2 1
4 006 440 43.1 м² 1 1 В продаже 3 1
3 976 680 42.8 м² 1 1 В продаже 5 1
3 987 840 42.9 м² 1 1 В продаже 6 1
3 984 300 41.9 м² 1 1 В продаже 8 1
6 493 250 68.3 м² 2 2 В продаже 10 1
4 104 950 43.2 м² 1 2 В продаже 11 1
5 734 200 60.4 м² 2 2 В продаже 12 1
4 204 700 44.3 м² 1 2 В продаже 13 1
8 513 900 89.6 м² 3 2 В продаже 14 1
6 493 250 68.3 м² 2 3 В продаже 17 1
4 104 950 43.2 м² 1 3 В продаже 18 1
5 734 200 60.4 м² 2 3 В продаже 19 1
4 204 700 44.3 м² 1 3 В продаже 20 1
8 513 900 89.6 м² 3 3 В продаже 21 1
3 984 300 41.9 м² 1 3 В продаже 22 1
5 275 830 54.4 м² 2 7 В продаже 44 1
6 493 250 68.3 м² 2 7 В продаже 45 1
4 104 950 43.2 м² 1 7 В продаже 46 1
4 233 200 44.6 м² 1 7 В продаже 48 1
8 513 900 89.6 м² 3 7 В продаже 49 1
3 984 300 41.9 м² 1 7 В продаже 50 1
5 306 870 54.7 м² 2 8 В продаже 51 1
6 523 650 68.7 м² 2 8 В продаже 52 1
4 142 950 43.6 м² 1 8 В продаже 53 1
5 800 700 61.1 м² 2 8 В продаже 54 1
4 267 400 44.9 м² 1 8 В продаже 55 1
8 584 200 90.4 м² 3 8 В продаже 56 1
5 168 000 54.4 м² 2 1 В продаже 58 2
6 354 690 68.3 м² 2 1 В продаже 59 2
4 006 440 43.1 м² 1 1 В продаже 60 2
3 569 150 37.6 м² 1 1 В продаже 61 2
3 976 680 42.8 м² 1 1 В продаже 62 2
3 900 420 41.9 м² 1 1 В продаже 65 2
5 276 800 54.4 м² 2 2 В продаже 66 2
6 491 350 68.3 м² 2 2 В продаже 67 2
4 107 800 43.2 м² 1 2 В продаже 68 2
5 742 750 60.5 м² 2 2 В продаже 69 2
4 204 700 44.3 м² 1 2 В продаже 70 2
8 515 800 89.6 м² 3 2 В продаже 71 2
3 984 300 41.9 м² 1 2 В продаже 72 2
4 107 800 43.2 м² 1 3 В продаже 75 2
3 984 300 41.9 м² 1 3 В продаже 79 2
4 107 800 43.2 м² 1 7 В продаже 103 2
4 233 200 44.6 м² 1 7 В продаже 105 2
5 307 840 54.7 м² 2 8 В продаже 108 2
6 521 750 68.7 м² 2 8 В продаже 109 2
4 141 050 43.6 м² 1 8 В продаже 110 2
5 804 500 61.1 м² 2 8 В продаже 111 2
8 586 100 90.4 м² 3 8 В продаже 113 2
4 020 400 42.3 м² 1 8 В продаже 114 2
3 832 530 41.2 м² 1 1 В продаже 115 3
3 547 020 38.1 м² 1 1 В продаже 116 3
3 985 050 42.9 м² 1 1 В продаже 117 3
6 250 530 67.2 м² 2 1 В продаже 118 3
6 143 580 66.1 м² 2 1 В продаже 119 3
2 718 390 29.2 м² студия 1 В продаже 120 3
2 736 990 29.4 м² студия 1 В продаже 121 3
3 915 900 41.2 м² 1 2 В продаже 122 3
8 515 800 89.6 м² 3 2 В продаже 123 3
4 114 450 43.3 м² 1 2 В продаже 124 3
4 113 500 43.3 м² 1 2 В продаже 125 3
6 574 950 69.2 м² 2 2 В продаже 126 3
6 574 950 69.2 м² 2 3 В продаже 133 3
2 919 350 30.7 м² студия 3 В продаже 134 3
2 938 350 30.9 м² студия 3 В продаже 135 3
3 915 900 41.2 м² 1 7 В продаже 157 3
8 515 800 89.6 м² 3 7 В продаже 158 3
4 113 500 43.3 м² 1 7 В продаже 160 3
8 586 100 90.4 м² 3 8 В продаже 165 3
6 631 950 69.8 м² 2 8 В продаже 168 3
2 949 750 31.1 м² студия 8 В продаже 169 3
2 966 850 31.2 м² студия 8 В продаже 170 3
5 366 550 56.5 м² 2 1 В продаже 171 4
3 814 860 41.0 м² 1 1 В продаже 174 4
4 809 960 51.7 м² 2 1 В продаже 175 4
5 609 760 60.3 м² 2 1 В продаже 176 4
5 480 500 56.5 м² 2 2 В продаже 177 4
6 499 900 68.4 м² 2 2 В продаже 178 4
2 900 350 30.5 м² студия 2 В продаже 179 4
2 945 000 31.0 м² студия 2 В продаже 180 4
5 055 900 53.2 м² 2 2 В продаже 182 4
5 730 400 60.3 м² 2 2 В продаже 183 4
5 480 500 56.5 м² 2 3 В продаже 184 4
6 499 900 68.4 м² 2 3 В продаже 185 4
2 900 350 30.5 м² студия 3 В продаже 186 4
2 945 000 31.0 м² студия 3 В продаже 187 4
5 055 900 53.2 м² 2 3 В продаже 189 4
5 730 400 60.3 м² 2 3 В продаже 190 4
5 480 500 56.5 м² 2 7 В продаже 212 4
2 973 500 31.3 м² студия 7 В продаже 215 4
5 084 400 53.5 м² 2 7 В продаже 217 4
6 526 500 68.7 м² 2 8 В продаже 220 4
2 928 850 30.8 м² студия 8 В продаже 221 4
2 973 500 31.3 м² студия 8 В продаже 222 4
2 812 000 29.6 м² студия 8 В продаже 223 4
5 084 400 53.5 м² 2 8 В продаже 224 4
`;

// Helper to remove spaces from numbers and parse them
const parsePrice = (str) => {
    // Remove spaces only if they are thousands separators
    // Regex matches digit followed by space followed by digit 3 times
    return parseInt(str.trim().replace(/\s+/g, ''));
};

const lines = rawData.trim().split('\n');
const apartments = lines.map((line, index) => {
    // Regex is tricky because spaces can be delimiters OR inside the number
    // "5 167 050 54.4 м² 2 1 В продаже 1 1"

    // Strategy:
    // 1. Extract area (number + " м²")
    // 2. Everything before area is PRICE
    // 3. Everything after area is ROOMS FLOOR STATUS FILE/ID ENTRANCE

    const areaMatch = line.match(/(\d+\.?\d*)\s*м²/);
    if (!areaMatch) {
        console.error(`Error parsing line ${index}: ${line}`);
        return null;
    }

    const areaStr = areaMatch[0];
    const areaVal = areaMatch[1];
    const parts = line.split(areaStr);

    const priceRaw = parts[0].trim();
    const price = parsePrice(priceRaw);

    const rest = parts[1].trim(); // "2 1 В продаже 1 1"

    // Looking for "В продаже" as status anchor
    const statusMatch = rest.match(/В продаже/);
    if (!statusMatch) {
        // Try other statuses if any, or general 'word' search
        console.error(`Error parsing status in line ${index}: ${line}`);
        return null;
    }

    const status = "В продаже";
    const restParts = rest.split(status);

    const preStatus = restParts[0].trim(); // "2 1" -> ROOMS FLOOR
    const postStatus = restParts[1].trim(); // "1 1" -> FILE/ID ENTRANCE (Assuming)

    // Warning: "студия" might be in ROOMS
    let roomsRaw = "";
    let floorRaw = "";

    if (preStatus.includes("студия")) {
        roomsRaw = "студия";
        floorRaw = preStatus.replace("студия", "").trim();
    } else {
        const preParts = preStatus.split(/\s+/);
        roomsRaw = preParts[0];
        floorRaw = preParts[1];
    }

    const postParts = postStatus.split(/\s+/);
    const id = postParts[0]; // Assuming "1" is ID or File number. Let's use it as ID for now.
    const entrance = postParts[1];

    return {
        id: parseInt(id) || index + 1000, // Fallback ID if parsing fails? But it is likely 1, 2, 44 etc.
        complex: 'ЖК Экогород 3, д. 1', // Hardcoded as per assumption
        title: `${roomsRaw === 'студия' ? 'Студия' : roomsRaw + '-комнатная'}, ${areaVal} м²`,
        area: areaVal + ' м²',
        areaNum: parseFloat(areaVal),
        price: priceRaw, // Keep formatted string for display
        priceNum: price,
        rooms: roomsRaw === 'студия' ? 0 : parseInt(roomsRaw), // 0 for studio
        floor: parseInt(floorRaw),
        totalFloors: 8, // Derived from data showing max floor 8
        entrance: parseInt(entrance),
        totalEntrances: 4, // Derived from data showing max entrance 4
        status: status,
        image: '/images/property-plan.webp' // Placeholder
    };
});

const output = `export const apartments = ${JSON.stringify(apartments, null, 2)}`;
console.log(output);

const fs = require('fs');

// Existing apartment IDs from the data you provided
const existingIds = [1, 2, 3, 5, 6, 8, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 44, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 58, 59, 60, 61, 62, 65, 66, 67, 68, 69, 70, 71, 72, 75, 79, 103, 105, 108, 109, 110, 111, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 133, 134, 135, 157, 158, 160, 165, 168, 169, 170, 171, 174, 175, 176, 177, 178, 179, 180, 182, 183, 184, 185, 186, 187, 189, 190, 212, 215, 217, 220, 221, 222, 223, 224];

// Read existing file
const existingContent = fs.readFileSync('data/apartments.ts', 'utf8');

// Parse existing apartments using regex
const matches = existingContent.match(/\{[^}]+\}/g);
const existingApartments = matches ? matches.map(m => {
    try {
        // Convert to valid JSON by adding quotes to keys
        const json = m.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
        return JSON.parse(json);
    } catch (e) {
        return null;
    }
}).filter(Boolean) : [];

const existingMap = new Map(existingApartments.map(apt => [apt.id, apt]));

// Generate full list
const fullApartments = [];
for (let i = 1; i <= 224; i++) {
    if (existingMap.has(i)) {
        fullApartments.push(existingMap.get(i));
    } else {
        // Generate placeholder for sold apartment
        const floor = Math.ceil((i % 57) / 7) || 1;
        const entrance = Math.ceil(i / 57) || 1;
        fullApartments.push({
            id: i,
            complex: 'ЖК Экогород 3, д. 1',
            title: 'Квартира продана',
            area: '-',
            areaNum: 0,
            price: '-',
            priceNum: 0,
            rooms: 0,
            floor: floor > 8 ? 8 : floor,
            totalFloors: 8,
            entrance: entrance > 4 ? 4 : entrance,
            totalEntrances: 4,
            status: 'В продаже',
            image: '/images/property-plan.webp'
        });
    }
}

// Generate output
const output = `// Данные квартир ЖК Экогород 3 (Полный список: 224 квартиры)
export const apartments = ${JSON.stringify(fullApartments, null, 2).replace(/"(\w+)":/g, '$1:')}
`;

fs.writeFileSync('data/apartments.ts', output);
console.log('Готово! Файл data/apartments.ts обновлён. Всего квартир: ' + fullApartments.length);

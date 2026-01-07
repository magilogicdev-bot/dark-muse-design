import { apartments as existingApartments } from '../data/apartments.ts';
import fs from 'fs';

// Helper to generate a missing apartment
const generateApartment = (id) => {
    // Approximate logic to guess floor/rooms based on neighbors/pattern if needed
    // For now, simple placeholders
    return {
        id: id,
        complex: 'ЖК Экогород 3, д. 1',
        title: 'Квартира продана',
        area: '-',
        areaNum: 0,
        price: '-',
        priceNum: 0,
        rooms: 0,
        floor: Math.ceil(id / 28), // Rough estimate: 224 apts / 8 floors = 28 apts/floor?
        totalFloors: 8,
        entrance: Math.ceil(id / 56), // Rough estimate
        totalEntrances: 4,
        status: 'Продана',
        image: '/images/property-plan.webp'
    };
};

const fullApartments = [];
const existingMap = new Map(existingApartments.map(apt => [apt.id, apt]));

for (let i = 1; i <= 224; i++) {
    if (existingMap.has(i)) {
        fullApartments.push(existingMap.get(i));
    } else {
        fullApartments.push(generateApartment(i));
    }
}

const content = `// Данные квартир ЖК Экогород 3 (Полный список 224)
export const apartments = ${JSON.stringify(fullApartments, null, 2)}
`;

// Write to file
fs.writeFileSync('data/apartments.ts', content);
console.log('File data/apartments.ts has been updated with ' + fullApartments.length + ' apartments.');

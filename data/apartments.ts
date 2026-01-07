// Данные квартир ЖК Экогород 3 (Полный список: 224 квартиры)
export interface Apartment {
  id: number;
  complex: string;
  title: string;
  area: string;
  areaNum: number;
  price: string;
  priceNum: number;
  rooms: number | string;
  floor: number;
  totalFloors: number;
  entrance: number;
  totalEntrances: number;
  status: string;
  image: string;
  imagePicture: string;
  imageFurniture: string;
  imageDimentions: string;
}

// Данные из таблицы (квартиры в продаже)
const apartmentsData: Array<{
  price: number;
  area: number;
  rooms: number | string;
  floor: number;
  planId: number;
  entrance: number;
}> = [
    // Подъезд 1
    { price: 5167050, area: 54.4, rooms: 2, floor: 1, planId: 1, entrance: 1 },
    { price: 6355620, area: 68.3, rooms: 2, floor: 1, planId: 2, entrance: 1 },
    { price: 4006440, area: 43.1, rooms: 1, floor: 1, planId: 3, entrance: 1 },
    { price: 3976680, area: 42.8, rooms: 1, floor: 1, planId: 5, entrance: 1 },
    { price: 3987840, area: 42.9, rooms: 1, floor: 1, planId: 6, entrance: 1 },
    { price: 3984300, area: 41.9, rooms: 1, floor: 1, planId: 8, entrance: 1 },
    { price: 6493250, area: 68.3, rooms: 2, floor: 2, planId: 10, entrance: 1 },
    { price: 4104950, area: 43.2, rooms: 1, floor: 2, planId: 11, entrance: 1 },
    { price: 5734200, area: 60.4, rooms: 2, floor: 2, planId: 12, entrance: 1 },
    { price: 4204700, area: 44.3, rooms: 1, floor: 2, planId: 13, entrance: 1 },
    { price: 8513900, area: 89.6, rooms: 3, floor: 2, planId: 14, entrance: 1 },
    { price: 6493250, area: 68.3, rooms: 2, floor: 3, planId: 17, entrance: 1 },
    { price: 4104950, area: 43.2, rooms: 1, floor: 3, planId: 18, entrance: 1 },
    { price: 5734200, area: 60.4, rooms: 2, floor: 3, planId: 19, entrance: 1 },
    { price: 4204700, area: 44.3, rooms: 1, floor: 3, planId: 20, entrance: 1 },
    { price: 8513900, area: 89.6, rooms: 3, floor: 3, planId: 21, entrance: 1 },
    { price: 3984300, area: 41.9, rooms: 1, floor: 3, planId: 22, entrance: 1 },
    { price: 5275830, area: 54.4, rooms: 2, floor: 7, planId: 44, entrance: 1 },
    { price: 6493250, area: 68.3, rooms: 2, floor: 7, planId: 45, entrance: 1 },
    { price: 4104950, area: 43.2, rooms: 1, floor: 7, planId: 46, entrance: 1 },
    { price: 4233200, area: 44.6, rooms: 1, floor: 7, planId: 48, entrance: 1 },
    { price: 8513900, area: 89.6, rooms: 3, floor: 7, planId: 49, entrance: 1 },
    { price: 3984300, area: 41.9, rooms: 1, floor: 7, planId: 50, entrance: 1 },
    { price: 5306870, area: 54.7, rooms: 2, floor: 8, planId: 51, entrance: 1 },
    { price: 6523650, area: 68.7, rooms: 2, floor: 8, planId: 52, entrance: 1 },
    { price: 4142950, area: 43.6, rooms: 1, floor: 8, planId: 53, entrance: 1 },
    { price: 5800700, area: 61.1, rooms: 2, floor: 8, planId: 54, entrance: 1 },
    { price: 4267400, area: 44.9, rooms: 1, floor: 8, planId: 55, entrance: 1 },
    { price: 8584200, area: 90.4, rooms: 3, floor: 8, planId: 56, entrance: 1 },

    // Подъезд 2
    { price: 5168000, area: 54.4, rooms: 2, floor: 1, planId: 58, entrance: 2 },
    { price: 6354690, area: 68.3, rooms: 2, floor: 1, planId: 59, entrance: 2 },
    { price: 4006440, area: 43.1, rooms: 1, floor: 1, planId: 60, entrance: 2 },
    { price: 3569150, area: 37.6, rooms: 1, floor: 1, planId: 61, entrance: 2 },
    { price: 3976680, area: 42.8, rooms: 1, floor: 1, planId: 62, entrance: 2 },
    { price: 3900420, area: 41.9, rooms: 1, floor: 1, planId: 65, entrance: 2 },
    { price: 5276800, area: 54.4, rooms: 2, floor: 2, planId: 66, entrance: 2 },
    { price: 6491350, area: 68.3, rooms: 2, floor: 2, planId: 67, entrance: 2 },
    { price: 4107800, area: 43.2, rooms: 1, floor: 2, planId: 68, entrance: 2 },
    { price: 5742750, area: 60.5, rooms: 2, floor: 2, planId: 69, entrance: 2 },
    { price: 4204700, area: 44.3, rooms: 1, floor: 2, planId: 70, entrance: 2 },
    { price: 8515800, area: 89.6, rooms: 3, floor: 2, planId: 71, entrance: 2 },
    { price: 3984300, area: 41.9, rooms: 1, floor: 2, planId: 72, entrance: 2 },
    { price: 4107800, area: 43.2, rooms: 1, floor: 3, planId: 75, entrance: 2 },
    { price: 3984300, area: 41.9, rooms: 1, floor: 3, planId: 79, entrance: 2 },
    { price: 4107800, area: 43.2, rooms: 1, floor: 7, planId: 103, entrance: 2 },
    { price: 4233200, area: 44.6, rooms: 1, floor: 7, planId: 105, entrance: 2 },
    { price: 5307840, area: 54.7, rooms: 2, floor: 8, planId: 108, entrance: 2 },
    { price: 6521750, area: 68.7, rooms: 2, floor: 8, planId: 109, entrance: 2 },
    { price: 4141050, area: 43.6, rooms: 1, floor: 8, planId: 110, entrance: 2 },
    { price: 5804500, area: 61.1, rooms: 2, floor: 8, planId: 111, entrance: 2 },
    { price: 8586100, area: 90.4, rooms: 3, floor: 8, planId: 113, entrance: 2 },
    { price: 4020400, area: 42.3, rooms: 1, floor: 8, planId: 114, entrance: 2 },

    // Подъезд 3
    { price: 3832530, area: 41.2, rooms: 1, floor: 1, planId: 115, entrance: 3 },
    { price: 3547020, area: 38.1, rooms: 1, floor: 1, planId: 116, entrance: 3 },
    { price: 3985050, area: 42.9, rooms: 1, floor: 1, planId: 117, entrance: 3 },
    { price: 6250530, area: 67.2, rooms: 2, floor: 1, planId: 118, entrance: 3 },
    { price: 6143580, area: 66.1, rooms: 2, floor: 1, planId: 119, entrance: 3 },
    { price: 2718390, area: 29.2, rooms: 'студия', floor: 1, planId: 120, entrance: 3 },
    { price: 2736990, area: 29.4, rooms: 'студия', floor: 1, planId: 121, entrance: 3 },
    { price: 3915900, area: 41.2, rooms: 1, floor: 2, planId: 122, entrance: 3 },
    { price: 8515800, area: 89.6, rooms: 3, floor: 2, planId: 123, entrance: 3 },
    { price: 4114450, area: 43.3, rooms: 1, floor: 2, planId: 124, entrance: 3 },
    { price: 4113500, area: 43.3, rooms: 1, floor: 2, planId: 125, entrance: 3 },
    { price: 6574950, area: 69.2, rooms: 2, floor: 2, planId: 126, entrance: 3 },
    { price: 6574950, area: 69.2, rooms: 2, floor: 3, planId: 133, entrance: 3 },
    { price: 2919350, area: 30.7, rooms: 'студия', floor: 3, planId: 134, entrance: 3 },
    { price: 2938350, area: 30.9, rooms: 'студия', floor: 3, planId: 135, entrance: 3 },
    { price: 3915900, area: 41.2, rooms: 1, floor: 7, planId: 157, entrance: 3 },
    { price: 8515800, area: 89.6, rooms: 3, floor: 7, planId: 158, entrance: 3 },
    { price: 4113500, area: 43.3, rooms: 1, floor: 7, planId: 160, entrance: 3 },
    { price: 8586100, area: 90.4, rooms: 3, floor: 8, planId: 165, entrance: 3 },
    { price: 6631950, area: 69.8, rooms: 2, floor: 8, planId: 168, entrance: 3 },
    { price: 2949750, area: 31.1, rooms: 'студия', floor: 8, planId: 169, entrance: 3 },
    { price: 2966850, area: 31.2, rooms: 'студия', floor: 8, planId: 170, entrance: 3 },

    // Подъезд 4
    { price: 5366550, area: 56.5, rooms: 2, floor: 1, planId: 171, entrance: 4 },
    { price: 3814860, area: 41.0, rooms: 1, floor: 1, planId: 174, entrance: 4 },
    { price: 4809960, area: 51.7, rooms: 2, floor: 1, planId: 175, entrance: 4 },
    { price: 5609760, area: 60.3, rooms: 2, floor: 1, planId: 176, entrance: 4 },
    { price: 5480500, area: 56.5, rooms: 2, floor: 2, planId: 177, entrance: 4 },
    { price: 6499900, area: 68.4, rooms: 2, floor: 2, planId: 178, entrance: 4 },
    { price: 2900350, area: 30.5, rooms: 'студия', floor: 2, planId: 179, entrance: 4 },
    { price: 2945000, area: 31.0, rooms: 'студия', floor: 2, planId: 180, entrance: 4 },
    { price: 5055900, area: 53.2, rooms: 2, floor: 2, planId: 182, entrance: 4 },
    { price: 5730400, area: 60.3, rooms: 2, floor: 2, planId: 183, entrance: 4 },
    { price: 5480500, area: 56.5, rooms: 2, floor: 3, planId: 184, entrance: 4 },
    { price: 6499900, area: 68.4, rooms: 2, floor: 3, planId: 185, entrance: 4 },
    { price: 2900350, area: 30.5, rooms: 'студия', floor: 3, planId: 186, entrance: 4 },
    { price: 2945000, area: 31.0, rooms: 'студия', floor: 3, planId: 187, entrance: 4 },
    { price: 5055900, area: 53.2, rooms: 2, floor: 3, planId: 189, entrance: 4 },
    { price: 5730400, area: 60.3, rooms: 2, floor: 3, planId: 190, entrance: 4 },
    { price: 5480500, area: 56.5, rooms: 2, floor: 7, planId: 212, entrance: 4 },
    { price: 2973500, area: 31.3, rooms: 'студия', floor: 7, planId: 215, entrance: 4 },
    { price: 5084400, area: 53.5, rooms: 2, floor: 7, planId: 217, entrance: 4 },
    { price: 6526500, area: 68.7, rooms: 2, floor: 8, planId: 220, entrance: 4 },
    { price: 2928850, area: 30.8, rooms: 'студия', floor: 8, planId: 221, entrance: 4 },
    { price: 2973500, area: 31.3, rooms: 'студия', floor: 8, planId: 222, entrance: 4 },
    { price: 2812000, area: 29.6, rooms: 'студия', floor: 8, planId: 223, entrance: 4 },
    { price: 5084400, area: 53.5, rooms: 2, floor: 8, planId: 224, entrance: 4 },
  ];

// Создаём Map для быстрого доступа к данным квартир
const dataMap = new Map(apartmentsData.map(apt => [apt.planId, apt]));

// Функция форматирования цены
function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₽';
}

// Функция получения названия по количеству комнат
function getRoomTitle(rooms: number | string): string {
  if (rooms === 'студия') return 'Студия';
  if (rooms === 1) return '1-комнатная квартира';
  if (rooms === 2) return '2-комнатная квартира';
  if (rooms === 3) return '3-комнатная квартира';
  return `${rooms}-комнатная квартира`;
}

// Генерация полного списка квартир (224 шт.)
export const apartments: Apartment[] = [];

for (let i = 1; i <= 224; i++) {
  const data = dataMap.get(i);

  if (data) {
    // Квартира в продаже
    apartments.push({
      id: i,
      complex: 'ЖК Экогород 3, д. 1',
      title: getRoomTitle(data.rooms),
      area: `${data.area} м²`,
      areaNum: data.area,
      price: formatPrice(data.price),
      priceNum: data.price,
      rooms: data.rooms === 'студия' ? 0 : data.rooms,
      floor: data.floor,
      totalFloors: 8,
      entrance: data.entrance,
      totalEntrances: 4,
      status: 'В продаже',
      image: `/images/apartments/${i}/picture.webp`,
      imagePicture: `/images/apartments/${i}/picture.webp`,
      imageFurniture: `/images/apartments/${i}/furniture.webp`,
      imageDimentions: `/images/apartments/${i}/dimentions.webp`
    });
  } else {
    // Квартира продана (заглушка)
    const entrance = Math.ceil(i / 57) || 1;
    const floor = Math.ceil((i % 57) / 7) || 1;
    apartments.push({
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
      status: 'Продано',
      image: `/images/apartments/${i}/picture.webp`,
      imagePicture: `/images/apartments/${i}/picture.webp`,
      imageFurniture: `/images/apartments/${i}/furniture.webp`,
      imageDimentions: `/images/apartments/${i}/dimentions.webp`
    });
  }
}

// Экспорт только квартир в продаже
export const availableApartments = apartments.filter(apt => apt.status === 'В продаже');

// Статистика
export const stats = {
  total: apartments.length,
  available: availableApartments.length,
  sold: apartments.length - availableApartments.length,
  minPrice: Math.min(...availableApartments.map(apt => apt.priceNum)),
  maxPrice: Math.max(...availableApartments.map(apt => apt.priceNum)),
  minArea: Math.min(...availableApartments.map(apt => apt.areaNum)),
  maxArea: Math.max(...availableApartments.map(apt => apt.areaNum)),
};

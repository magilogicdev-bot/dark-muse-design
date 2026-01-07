<template>
  <NuxtLink
    :to="`/apartment/${apartment.id}`"
    class="apartment-card"
  >
    <!-- Заголовок -->
    <div class="apartment-card__header">
      <p class="apartment-card__complex">{{ apartment.complex }}</p>
      <p class="apartment-card__title">{{ roomsLabel }}, {{ apartment.area }}</p>
    </div>
    
    <!-- Изображение планировки -->
    <div class="apartment-card__image-wrapper">
      <img 
        :src="apartment.imageFurniture || apartment.image" 
        :alt="apartment.title" 
        class="apartment-card__image"
        loading="lazy"
      />
    </div>
    
    <!-- Нижняя часть: подъезд, этаж, цена -->
    <div class="apartment-card__footer">
      <p class="apartment-card__info">
        Подъезд {{ apartment.entrance }}/{{ apartment.totalEntrances }} &nbsp; Этаж {{ apartment.floor }}/{{ apartment.totalFloors }}
      </p>
      <p class="apartment-card__price">{{ formattedPrice }}</p>
    </div>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  apartment: {
    type: Object,
    required: true
  }
})

// Форматирование цены без символа рубля
const formattedPrice = computed(() => {
  if (props.apartment.priceNum) {
    return props.apartment.priceNum.toLocaleString('ru-RU').replace(/,/g, ' ')
  }
  return props.apartment.price?.replace(' ₽', '') || '-'
})

// Название по количеству комнат
const roomsLabel = computed(() => {
  const rooms = props.apartment.rooms
  if (rooms === 0 || rooms === 'студия') return 'Студия'
  if (rooms === 1) return '1-комнатная'
  if (rooms === 2) return '2-комнатная'
  if (rooms === 3) return '3-комнатная'
  return `${rooms}-комнатная`
})
</script>

<style scoped>
.apartment-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 32px; /* Увеличенный радиус скругления */
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); /* Легкая тень */
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  height: 100%;
}

.apartment-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.apartment-card__header {
  padding: 35px 20px 0px; /* Увеличенные отступы сверху */
  text-align: center;
}

.apartment-card__complex {
  font-size: 22px; /* Увеличенный шрифт */
  font-weight: 400;
  color: #9E9E9E; /* Светло-серый цвет */
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}

.apartment-card__title {
  font-size: 32px; /* Крупный заголовок */
  font-weight: 400; /* Не слишком жирный */
  color: #757575; /* Тёмно-серый */
  margin: 0;
  letter-spacing: -0.02em;
}

.apartment-card__image-wrapper {
  flex: 1;
  padding: 30px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
}

.apartment-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 350px;
}

.apartment-card__footer {
  padding: 0px 20px 40px; /* Отступы снизу */
  text-align: center;
}

.apartment-card__info {
  font-size: 22px; /* Крупнее */
  font-weight: 400;
  color: #9E9E9E; /* Светло-серый */
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.apartment-card__price {
  font-size: 48px; /* Очень крупная цена */
  font-weight: 500;
  color: #219653; /* Ярко-зелёный */
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1;
}

/* Responsive adjustments */
@media (max-width: 1536px) {
  .apartment-card__title { font-size: 28px; }
  .apartment-card__price { font-size: 42px; }
  .apartment-card__complex, .apartment-card__info { font-size: 20px; }
}

@media (max-width: 1280px) {
  .apartment-card__title { font-size: 24px; }
  .apartment-card__price { font-size: 36px; }
  .apartment-card__complex, .apartment-card__info { font-size: 18px; }
}

@media (max-width: 768px) {
  .apartment-card {
    border-radius: 24px;
  }
  
  .apartment-card__header {
    padding: 25px 16px 0;
  }
  
  .apartment-card__complex {
    font-size: 16px;
  }
  
  .apartment-card__title {
    font-size: 20px;
  }
  
  .apartment-card__image-wrapper {
    padding: 20px 20px;
    min-height: 180px;
  }
  
  .apartment-card__image {
    max-height: 220px;
  }
  
  .apartment-card__footer {
    padding: 0 16px 25px;
  }
  
  .apartment-card__info {
    font-size: 16px;
  }
  
  .apartment-card__price {
    font-size: 28px;
  }
}
</style>

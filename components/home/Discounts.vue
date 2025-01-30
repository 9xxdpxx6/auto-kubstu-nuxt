<template>
  <div class="container-fluid mb-5">
    <div class="row flex-column flex-lg-row align-items-stretch mb-5 bg-info">
      <!-- Первая колонка -->
      <div class="col-12 col-lg mb-2 mb-md-0 px-0">
        <div class="image-container rounded-0" :style="{ backgroundImage: `url(${discounts[0].image})` }">
          <div class="overlay">
            <h3 class="display-6 text-light">{{ discounts[0].name }}</h3>
            <p class="lead text-light">{{ discounts[0].description }}</p>
          </div>
        </div>
      </div>

      <!-- Вторая колонка -->
      <div class="col-12 col-lg-4 col-xxl-3 d-flex align-items-stretch mb-2 mb-md-0 p-0">
        <div class="text-overlay text-light w-100 d-flex flex-column justify-content-center my-0">
          <h3 class="display-6">{{ discounts[1].name }}</h3>
          <p class="lead">{{ discounts[1].description }}</p>
          <NuxtLink to="/discounts" class="btn btn-light mt-auto">
            <p class="lead my-0">Узнайте больше</p>
          </NuxtLink>
        </div>
      </div>

      <!-- Третья колонка -->
      <div class="col-12 col-lg mb-2 mb-md-0 px-0">
        <div class="image-container rounded-0" :style="{ backgroundImage: `url(${discounts[2].image})` }">
          <div class="overlay">
            <h3 class="display-6 text-light">{{ discounts[2].name }}</h3>
            <p class="lead text-light">{{ discounts[2].description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Discount {
  name: string
  description: string
  image: string
}

const discounts: Discount[] = [
  {
    name: 'Cкидки учащимся и студентам РФ',
    description: 'Воспользуйтесь скидкой при получении образования.',
    image: '/images/discounts/discount-1-skoda.JPG',
  },
  {
    name: 'Скидка на водительскую медицинскую комиссию',
    description: 'Скидка в водительской медицинской комиссии «ТехМедЭксперт 1-6-8».',
    image: '/images/discounts/discount-2-class.jpg',
  },
  {
    name: 'Оплата материнским капиталом',
    description: 'Используйте материнский капитал для обучения в автошколе.',
    image: '/images/discounts/discount-2-class.jpg',
  }
]
</script>

<style scoped>
.image-container {
  height: 100%;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 0;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.25);
  color: white;
  padding: 20px;
  text-align: center;
}

.text-overlay {
  padding: 2rem;
}

.discounts-container,
.middle-button {
  display: none;
}
</style>
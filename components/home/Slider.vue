<template>
  <div class="mb-5">
    <div id="homeSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="carousel-bg" :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="carousel-caption">
              <h3 class="display-6">{{ slide.title }}</h3>
              <p class="lead">{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#homeSlider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#homeSlider" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import slide1Image from '~/assets/images/slider/slide-1-cars.jpg'
import slide2Image from '~/assets/images/slider/slide-2-square.jpg'
import slide3Image from '~/assets/images/slider/slide-3-moto.jpg'
import slide4Image from '~/assets/images/slider/slide-4-moto.jpg'

interface Slide {
  image: string
  title: string
  description: string
}

const slides = ref<Slide[]>([
  {
    image: slide1Image,
    title: 'Скидки на обучение',
    description: 'Скидки для обучающихся при оплате обучения и прохождении водительской медицинской комиссии'
  },
  {
    image: slide2Image,
    title: 'Лучшие инструкторы',
    description: 'Наши инструкторы – это профессионалы с многолетним опытом, готовые помочь вам освоить вождение быстро и эффективно'
  },
  {
    image: slide3Image,
    title: 'Категории А и В',
    description: 'Обучаем вождению как легковых автомобилей, так и мотоциклов, с гибкими графиками занятий'
  },
  {
    image: slide4Image,
    title: 'Гарантия успешной сдачи',
    description: '98% наших учеников успешно сдают экзамены в ГИБДД с первого раза'
  }
])
</script>

<style scoped>
#homeSlider {
  margin-top: -10px;
}

.carousel-bg {
  height: 650px;
  background-size: cover;
  background-position: center;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
}
</style>

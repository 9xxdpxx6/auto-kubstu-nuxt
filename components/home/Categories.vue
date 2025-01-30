<template>
  <div class="container mb-5">
    <h2 class="text-center mb-4 display-4">Категории обучения</h2>
    <div v-if="pending" class="text-center w-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else-if="error">
      <div class="alert alert-danger">
        Ошибка при загрузке категорий
      </div>
    </div>
    <div v-else class="row g-4">
      <div class="col-md-4" v-for="category in displayedCategories" :key="category.id">
        <div class="card h-100 shadow-hover border-0 d-flex flex-column gradient-border">
          <div class="position-relative">
            <div class="position-absolute top-0 end-0 p-3">
              <span class="display-4 icon-wrapper">
                <i v-if="category.icon" :class="category.icon.split(' ')" class="gradient-icon"></i>
              </span>
            </div>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="flex-grow-1">
              <h3 class="h4 mb-3 title-width">{{ category.name }}</h3>
              <div class="text-muted">
                <i class="fas fa-clock me-2 mb-2"></i>
                Длительность обучения: {{ category.duration }} часов
              </div>
            </div>
            <div class="row mt-4">
              <div class="price-tag mb-2">
                <span class="h2 text-primary fw-bold">{{ Math.floor(category.price) }}</span>
                <span class="text-muted h4 ms-2">₽</span>
              </div>
              <div class="col-6">
                <NuxtLink :to="`/pricing/${category.slug}`" class="btn btn-outline-primary w-100">
                  Подробнее
                </NuxtLink>
              </div>
              <div class="col-6">
                <button class="btn btn-primary w-100" @click="openModal(category)">
                  Записаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <NuxtLink to="/pricing" class="btn btn-primary">Посмотреть все категории</NuxtLink>
      </div>
    </div>

    <CallbackModal
      v-model:isOpen="isModalOpen"
      :title="`Запись на ${selectedCategory?.name || ''}`"
      :initial-comment="selectedCategory ? `Заявка на обратный звонок, ${selectedCategory.name}` : ''"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import type { CategoryPreview } from '~/types/categories'
import { useApi } from '~/composables/useApi'

const api = useApi()
const { data: categories, pending, error } = await useAsyncData('homeCategories',
  async () => {
    const response = await api.categories.list()
    return response.data?.value?.data || []
  },
  {
    transform: (data) => (data as CategoryPreview[]).slice(0, 3)
  }
)

const displayedCategories = computed(() => categories.value || [])

// Состояние модального окна
const isModalOpen = ref(false)
const selectedCategory = ref<CategoryPreview | null>(null)

const openModal = (category: CategoryPreview) => {
  selectedCategory.value = category
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCategory.value = null
}
</script>

<style scoped lang="scss">
.gradient-border {
  position: relative;
  background: white;
  border-radius: 8px;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 8px;
    padding: 3px;
    background: linear-gradient(
      -70deg,
      #1199DF,  // яркий голубой
      #2E54DC,  // синий
      #2E54DC,  // синий
      #9BD5FF   // светло-голубой
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 1;
  }
}

.card-body {
  position: relative;
  z-index: 2;
}

.shadow-hover {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(62, 14, 134, 0.15);
  }
}

.price-tag {
  .h2 {
    font-size: 2.5rem;
  }
}

.title-width {
  position: relative;
  width: 75%;
  z-index: 2;
}

.icon-wrapper {
  position: relative;
  z-index: 1;
}

.gradient-icon {
  background: linear-gradient(
    -70deg,
    #1199DF,  // яркий голубой
    #2E54DC,  // синий
    #2E54DC,  // синий
    #9BD5FF   // светло-голубой
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.8;
}
</style>

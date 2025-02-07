<template>
  <div class="container py-5">
    <h1 class="text-center mb-5">Цены на обучение</h1>
    
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <div v-else class="row g-4">
      <div v-for="category in categories" :key="category.id" class="col-md-6 col-lg-4">
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
              
            </div>
            <div class="row mt-4">
              <div class="text-muted">
                <i class="fas fa-clock me-2 mb-2"></i>
                Длительность обучения: {{ category.duration }} часов
              </div>
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
    </div>

    <CallbackModal
      v-model:isOpen="isModalOpen"
      :title="`Запись на ${selectedCategory?.name || ''}`"
      :initial-comment="selectedCategory ? `Заявка на обратный звонок, ${selectedCategory.name}` : ''"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { CategoryPreview, CategoriesResponse } from '@/types/categories'
import { useApi } from '~/composables/useApi'
import { usePageSeo } from '~/composables/useSeo'

const api = useApi()
const { pricingSeo } = usePageSeo()
pricingSeo()

const defaultResponse: CategoriesResponse = {
  data: [],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 0
    }
  }
}

const { data: categoriesResponse, status } = await useAsyncData(
  'categories',
  async () => {
    try {
      const response = await api.categories.list()
      console.log(response)
      const responseData = response.data?.value?.data
      console.log(responseData)
      if (Array.isArray(responseData) && responseData.length > 0) {
        return {
          data: responseData as CategoryPreview[],
          meta: {
            pagination: {
              page: 1,
              pageSize: 10,
              pageCount: 1,
              total: responseData.length
            }
          }
        } as CategoriesResponse
      }
      return defaultResponse
    } catch (err) {
      console.error('Ошибка при загрузке категорий:', err)
      return defaultResponse
    }
  }
)

const categories = computed(() => categoriesResponse.value?.data || [])
const loading = computed(() => status.value === 'pending')

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

<style lang="scss">
@import "assets/scss/pages/pricing/index.scss";
</style>
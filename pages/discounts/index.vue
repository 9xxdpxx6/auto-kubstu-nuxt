<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Программы лояльности</h1>

    <div v-if="loading" class="text-center w-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else-if="discounts.length > 0" class="row">
      <div class="mb-4 col-md-3" v-for="discount in discounts" :key="discount.id">
        <div class="card h-100">
          <img 
            :src="discount.preview || noImage" 
            class="card-img-top discount-image" 
            :alt="discount.name"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title h3">{{ discount.name }}</h5>
            <NuxtLink 
              :to="`/discounts/${discount.slug}`" 
              class="btn btn-outline-primary mt-auto"
            >
              Читать больше
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row text-center">
      <h3>На данный момент программы лояльности отсутствуют</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DiscountsResponse } from '~/types/discounts'
import noImage from '~/assets/images/no-image.png'

const api = useApi()
const { discountsSeo } = usePageSeo()
discountsSeo()

const defaultResponse = (): DiscountsResponse => ({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0
  }
})

const { data: discountsResponse, status } = await useAsyncData(
  'discounts',
  async () => {
    try {
      const response = await api.discounts.list()
      const value = response.data?.value as DiscountsResponse
      if (!value?.data || !value?.meta) {
        return defaultResponse()
      }
      return {
        data: value.data,
        meta: value.meta
      }
    } catch (err) {
      console.error('Ошибка при загрузке скидок:', err)
      return defaultResponse()
    }
  }
)

const discounts = computed(() => discountsResponse.value?.data || [])
const loading = computed(() => status.value === 'pending')
</script>

<style lang="scss">
@import 'assets/scss/pages/discounts/index.scss';
</style>
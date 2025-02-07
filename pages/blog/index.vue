<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Новости</h1>

    <!-- Фильтры и сортировка -->
    <div class="row mb-3">
      <div class="col-12 col-md-6 mb-3">
        <input
          v-model="filters.keyword"
          @input="applyFilters"
          type="text"
          class="form-control"
          placeholder="Поиск..."
        />
      </div>
      <div class="col-12 col-md-6 mb-3 d-flex flex-row">
        <select v-model="filters.sortOrder" @change="applyFilters" class="form-select">
          <option value="default">По умолчанию</option>
          <option value="date_desc">По дате (убывание)</option>
          <option value="date_asc">По дате (возрастание)</option>
        </select>
        <button class="btn btn-outline-secondary ms-2" @click="reset">
          <i class="fas fa-undo-alt"></i>
        </button>
      </div>
    </div>

    <!-- Сетка постов -->
    <div v-if="loading" class="text-center w-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="mb-4 col-md-3" v-for="post in filteredPosts" :key="post.id">
        <div class="card h-100">
          <img 
            :src="post.preview || noImage" 
            class="card-img-top post-image" 
            :alt="post.title"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title h3">{{ post.title }}</h5>
            <NuxtLink 
              :to="`/blog/${post.slug}`" 
              class="btn btn-outline-primary mt-auto"
            >
              Читать больше
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <nav v-if="pagination.lastPage > 1" class="d-flex text-center justify-content-center mt-4 mb-2">
      <ul class="pagination mx-auto">
        <li
          class="page-item"
          :class="{ disabled: pagination.currentPage === 1 }"
          @click="loadPosts(pagination.currentPage - 1)"
        >
          <button class="page-link"><i class="fas fa-chevron-left"></i></button>
        </li>
        <li
          v-for="page in pagination.lastPage"
          :key="page"
          class="page-item"
          :class="{ active: page === pagination.currentPage }"
          @click="loadPosts(page)"
        >
          <button class="page-link">{{ page }}</button>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagination.currentPage === pagination.lastPage }"
          @click="loadPosts(pagination.currentPage + 1)"
        >
          <button class="page-link">
            <i class="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { PostPreview, PostsResponse } from '~/types/blog'
import { usePageSeo } from '~/composables/useSeo'
import noImage from '~/assets/images/no-image.png'

const api = useApi()

const { blogSeo } = usePageSeo()
blogSeo()

const filters = reactive({
  keyword: '',
  sortOrder: 'default'
})

const pagination = reactive({
  currentPage: 1,
  lastPage: 1,
  total: 0
})

const defaultResponse = (): PostsResponse => ({
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    total: 0
  }
})

console.log('before func')

const { data: postsResponse, status, refresh } = useAsyncData(
  'posts',
  async () => {
console.log('async query')
    try {
      console.log('start try')
      const response = await api.posts.list({
        page: pagination.currentPage,
        keyword: filters.keyword || null,
        sort: filters.sortOrder || null
      })
      console.log('here must be log response')
      console.log(response)
      const value = response.data?.value as PostsResponse
      console.log(value)
      if (!value?.data || !value?.meta) {
        return defaultResponse()
      }
      return {
        data: value.data,
        meta: value.meta
      }
    } catch (err) {
      console.error('Error loading posts:', err)
      return defaultResponse()
    }
  }
)

const posts = computed(() => postsResponse.value?.data || [])
const filteredPosts = computed(() => posts.value as PostPreview[])

watch(postsResponse, (newData) => {
  if (newData?.meta) {
    pagination.currentPage = newData.meta.current_page
    pagination.lastPage = newData.meta.last_page
    pagination.total = newData.meta.total
  }
})

const loadPosts = async (page: number) => {
  if (page < 1 || page > pagination.lastPage) return
  pagination.currentPage = page
  await refresh()
  window.scrollTo(0, 0)
}

const applyFilters = () => {
  pagination.currentPage = 1
  refresh()
}

const reset = () => {
  filters.keyword = ''
  filters.sortOrder = 'default'
  applyFilters()
}

const loading = computed(() => status.value === 'pending')
</script>

<style lang="scss">
@import 'assets/scss/pages/blog/index.scss';
</style>

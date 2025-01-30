<template>
  <div class="container my-5">
    <div v-if="pending" class="text-center w-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else-if="post">
      <!-- Верхний блок с названием и изображением -->
      <div class="row align-items-center mb-4">
        <div class="col-md-8">
          <h2 class="display-4 mb-3">{{ post.title }}</h2>
          <p><strong>Дата публикации:</strong> {{ formatDate(post.date) }}</p>
        </div>
      </div>

      <!-- Описание на всю ширину контейнера -->
      <div class="post-content text-wrap" v-html="post.content"></div>

      <!-- Кнопка для возврата -->
      <div class="text-center mt-4">
        <NuxtLink to="/blog" class="btn btn-primary">Вернуться к списку новостей</NuxtLink>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Пост не найден.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import type { Post } from '@/types/blog'
import { useApi } from '~/composables/useApi'

const route = useRoute()
const config = useRuntimeConfig()

// Загрузка поста с использованием useAsyncData
const { data: post, pending, refresh } = useAsyncData<Post | null>(
  'post',
  async () => {
    try {
      const api = useApi()
      const response = await api.posts.getBySlug(route.params.slug as string)

      if (!response.data?.value?.data) {
        throw new Error('Пост не найден')
      }

      // Если данные пришли в виде массива, берем первый элемент
      const postData = Array.isArray(response.data.value.data)
        ? response.data.value.data[0]
        : response.data.value.data

      return postData as Post
    } catch (error) {
      console.error('Ошибка при запросе:', error)
      throw error
    }
  },
  {
    default: () => null
  }
)

// Обновляем данные при монтировании на клиенте
onMounted(() => {
  if (process.client) {
    refresh()
  }
})

// Форматирование даты
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// SEO мета-теги
useSeoMeta({
  title: () => (post.value ? `${post.value.title} - Новости` : 'Загрузка...'),
  ogTitle: () => (post.value ? `${post.value.title} - Новости` : 'Загрузка...'),
  description: () => (post.value ? post.value.content.substring(0, 160) : ''),
  ogDescription: () => (post.value ? post.value.content.substring(0, 160) : '')
})
</script>

<style lang="scss">
@import "assets/scss/pages/blog/slug.scss";
</style>

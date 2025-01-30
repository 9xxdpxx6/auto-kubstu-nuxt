<template>
  <div class="container-fluid mb-4">
    <h2 class="text-center display-4 mb-4">Новости</h2>
    <div v-if="pending" class="text-center w-100">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>
    <div v-else-if="error">
      <div class="alert alert-danger" role="alert">
        Произошла ошибка при загрузке новостей
      </div>
    </div>
    <div v-else class="row">
      <div class="col-md-3" v-for="post in displayedPosts" :key="post.id">
        <div class="card h-100">
          <img 
            :src="post.preview || noImage" 
            class="card-img-top post-image" 
            :alt="post.title"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title display-6">{{ post.title }}</h5>
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
    <div class="text-center mt-4">
      <NuxtLink 
        :to="{ name: 'blog' }" 
        class="btn btn-primary"
      >
        Посмотреть все новости
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/blog'
import { useApi } from '~/composables/useApi'
import noImage from '~/assets/images/no-image.png'

const api = useApi()

const { data: posts, pending, error } = await useAsyncData('homePosts',
  async () => {
    const response = await api.posts.list()
    return response.data?.value?.data || []
  },
  {
    transform: (data) => (data as Post[]).slice(0, 4)
  }
)

const displayedPosts = computed(() => posts.value || [])
</script>

<style scoped>
.post-image {
  height: 250px;
  object-fit: contain;
  width: 100%;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
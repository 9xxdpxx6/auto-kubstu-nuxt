<template>
    <div class="container my-5">
        <div v-if="pending" class="text-center w-100">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>
        <div v-else-if="category">
            <!-- Верхний блок с названием, превью, длительностью и ценой -->
            <div class="row align-items-center mb-4">
                <div class="col-md-8 lead">
                    <div class="d-flex flex-row">
                        <h2 class="display-4 mb-3 w-75">{{ category.name }}</h2>
                        <div class="icon-container ms-auto display-4 p-2">
                            <i :class="category.icon"></i>
                        </div>
                    </div>
                    <p class="mb-2"><strong class="fw-bold">Длительность:</strong> {{ category.duration }} часов</p>
                    <p><strong class="fw-bold">Цена:</strong> {{ Math.floor(category.price) }} ₽</p>
                </div>
            </div>

            <!-- Описание на всю ширину контейнера -->
            <div>
                <h4 class="mb-3">Описание:</h4>
                <div class="category-content text-wrap" v-html="category.description"></div>
            </div>

            <!-- Кнопки для записи -->
            <div class="text-center mt-4 d-flex justify-content-center gap-3">
                <NuxtLink to="/pricing" class="btn btn-outline-primary flex-grow-1" style="max-width: 300px;">
                    Вернуться к списку цен
                </NuxtLink>
                <button class="btn btn-primary flex-grow-1" style="max-width: 300px;" @click="openModal">
                    Записаться
                </button>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Категория не найдена</p>
        </div>

        <CallbackModal
            v-model:isOpen="isModalOpen"
            :title="category ? `Запись на ${category.name}` : 'Запись'"
            :initial-comment="category ? `Заявка на обратный звонок, ${category.name}` : ''"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Category } from '@/types/categories'
import { useApi } from '~/composables/useApi'

const route = useRoute()
const config = useRuntimeConfig()

// Состояние модального окна
const isModalOpen = ref(false)

// Загрузка категории с использованием useAsyncData
const { data: category, pending, refresh } = useAsyncData<Category | null>(
    'category',
    async () => {
        try {
            const api = useApi()
            const response = await api.categories.getBySlug(route.params.slug as string)

            if (!response.data?.value?.data) {
                throw new Error('Категория не найдена')
            }

            // Если данные пришли в виде массива, берем первый элемент
            const categoryData = Array.isArray(response.data.value.data)
                ? response.data.value.data[0]
                : response.data.value.data

            return categoryData as Category
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

// Методы для работы с модальным окном
const openModal = () => {
    isModalOpen.value = true
}

// SEO мета-теги
useSeoMeta({
    title: () => (category.value ? `${category.value.name} - Цены` : 'Загрузка...'),
    ogTitle: () => (category.value ? `${category.value.name} - Цены` : 'Загрузка...'),
    description: () => (category.value ? category.value.description.substring(0, 160) : ''),
    ogDescription: () => (category.value ? category.value.description.substring(0, 160) : '')
})
</script>

<style lang="scss">
@import "assets/scss/pages/pricing/slug.scss";
</style>
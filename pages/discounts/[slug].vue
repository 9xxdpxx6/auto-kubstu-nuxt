<template>
    <div class="container my-5">
        <div v-if="pending" class="text-center w-100">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
            </div>
        </div>
        <div v-else-if="discount">
            <div class="row align-items-center mb-4">
                <div class="col-md-8">
                    <h2 class="display-4 mb-3">{{ discount.name }}</h2>
                    <!-- <p><strong>Действует до:</strong> {{ formatDate(discount.end_date) }}</p> -->
                </div>
            </div>

            <!-- Описание на всю ширину контейнера -->
            <div class="discount-content text-wrap" v-html="discount.description"></div>

            <div class="text-center mt-4">
                <NuxtLink to="/discounts" class="btn btn-primary">Вернуться к списку скидок</NuxtLink>
            </div>
        </div>
        <div v-else>
            <p class="text-center">Скидка не найдена</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { Discount } from '@/types/discounts'
import { useApi } from '~/composables/useApi'

const route = useRoute()
const config = useRuntimeConfig()

// Загрузка скидки с использованием useAsyncData
const { data: discount, pending, refresh } = useAsyncData<Discount | null>(
    'discount',
    async () => {
        try {
            const api = useApi()
            const response = await api.discounts.getBySlug(route.params.slug as string)

            if (!response.data?.value?.data) {
                throw new Error('Скидка не найдена')
            }

            // Если данные пришли в виде массива, берем первый элемент
            const discountData = Array.isArray(response.data.value.data)
                ? response.data.value.data[0]
                : response.data.value.data

            return discountData as Discount
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
    title: () => (discount.value ? `${discount.value.name} - Скидки` : 'Загрузка...'),
    ogTitle: () => (discount.value ? `${discount.value.name} - Скидки` : 'Загрузка...'),
    description: () => (discount.value ? discount.value.description.substring(0, 160) : ''),
    ogDescription: () => (discount.value ? discount.value.description.substring(0, 160) : '')
})
</script>

<style lang="scss">
@import "assets/scss/pages/discounts/slug.scss";
</style>

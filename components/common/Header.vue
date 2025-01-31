<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg lead navbar-info bg-info">
            <div class="container">
                <NuxtLink class="navbar-brand" to="/" @click="closeNavbar">
                    <img 
                        :src="logo" 
                        alt="Автошкола Политех" 
                        height="40" 
                        ref="logoRef"
                        :class="{ 'bounce-in-top': isLogoLoaded }"
                        @load="handleLogoLoad"
                    />
                </NuxtLink>

                <button
                    class="navbar-toggler"
                    type="button"
                    @click="isNavbarOpen = !isNavbarOpen"
                    aria-controls="navbarNav"
                    :aria-expanded="isNavbarOpen"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div :class="['collapse', 'navbar-collapse', { 'show': isNavbarOpen }]" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/pricing" @click="closeNavbar">Цены</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/discounts" @click="closeNavbar">Скидки</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/blog" @click="closeNavbar">Новости</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink class="nav-link" to="/contacts" @click="closeNavbar">Контакты</NuxtLink>
                        </li>
                    </ul>

                    <button class="btn btn-outline-light" @click="openModal">
                        <p class="lead my-0">Обратный звонок</p>
                    </button>
                </div>
            </div>
        </nav>

        <CallbackModal
            v-model:isOpen="isModalOpen"
            title="Обратный звонок"
            initial-comment="Заявка на обратный звонок"
        />
    </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import logo from '~/assets/images/logo.png'

const isModalOpen = ref(false)
const isNavbarOpen = ref(false)
const isLogoLoaded = ref(false)
const logoRef = ref(null)
const route = useRoute()

const openModal = () => {
    isModalOpen.value = true
}

const closeNavbar = () => {
    isNavbarOpen.value = false
}

// Функция, которая запускает анимацию после загрузки логотипа
const handleLogoLoad = () => {
    isLogoLoaded.value = false
    setTimeout(() => {
        isLogoLoaded.value = true
    }, 50) // Небольшая задержка для перезапуска анимации
}

// Отслеживаем изменение маршрута (чтобы анимация срабатывала при каждом переходе на главную)
watch(() => route.path, (newPath) => {
    if (newPath === '/') {
        isLogoLoaded.value = false
        setTimeout(() => {
            isLogoLoaded.value = true
        }, 50)
    }
})

onMounted(() => {
    if (logoRef.value?.complete) {
        handleLogoLoad()
    }
})
</script>

<style lang="scss" scoped>
.navbar {
    &-brand img {
        max-height: 40px;
    }

    .nav-link {
        color: var(--bs-light) !important;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.8;
        }
    }
}

$animation-name: bounce-in-top;
$duration: 1.1s;

.bounce-in-top {
    animation: $animation-name $duration both;
}

@keyframes #{$animation-name} {
    0% {
        transform: translateY(-500px);
        animation-timing-function: ease-in;
        opacity: 0;
    }
    38% {
        transform: translateY(0);
        animation-timing-function: ease-out;
        opacity: 1;
    }
    55% {
        transform: translateY(-65px);
        animation-timing-function: ease-in;
    }
    72% {
        transform: translateY(0);
        animation-timing-function: ease-out;
    }
    81% {
        transform: translateY(-28px);
        animation-timing-function: ease-in;
    }
    90% {
        transform: translateY(0);
        animation-timing-function: ease-out;
    }
    95% {
        transform: translateY(-8px);
        animation-timing-function: ease-in;
    }
    100% {
        transform: translateY(0);
        animation-timing-function: ease-out;
    }
}
</style>

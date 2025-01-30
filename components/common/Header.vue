<template>
    <header>
        <nav class="navbar fixed-top navbar-expand-lg lead navbar-info bg-info">
            <div class="container">
                <NuxtLink class="navbar-brand" to="/" @click="closeNavbar">
                    <img :src="logo" alt="Автошкола Политех" height="40" />
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
import { ref } from 'vue'
import logo from '~/assets/images/logo.png'

const isModalOpen = ref(false)
const isNavbarOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeNavbar = () => {
    isNavbarOpen.value = false
}
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
</style>

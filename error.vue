<template>
	<div class="error-page bg-info text-light">
		<div class="container text-center">
			<!-- Логотип сверху, ссылка на главную -->
			<NuxtLink to="/" class="logo-container">
				<img :src="logo" alt="Логотип" class="logo mb-4" />
			</NuxtLink>

			<!-- Огромная 404 с рулём -->
			<div class="error-code">
				<span>4</span>
				<div class="steering-wheel"></div>
				<span>4</span>
			</div>

			<h2 class="display-4 mb-4">
				{{ error.statusCode === 404 ? 'Страница не найдена' : 'Произошла ошибка' }}
			</h2>

			<p v-if="error.statusCode === 404" class="lead mb-5">
				К сожалению, запрашиваемая страница отсутствует или была удалена. Возможно, вы ввели неправильный адрес или ссылка больше не актуальна. Попробуйте вернуться на главную страницу и воспользоваться меню навигации.
			</p>

			<!-- Кнопки -->
			<div class="button-container mb-4">
				<button class="btn btn-outline-light btn-lg" @click="handleBack">
					Назад
				</button>
				<button class="btn btn-light btn-lg" @click="handleError">
					Вернуться на главную
				</button>
			</div>

			<!-- Список ссылок внизу страницы -->
			<ul class="nav-links">
				<li><NuxtLink class="text-light" to="/pricing">Цены</NuxtLink></li>
				<li><NuxtLink class="text-light" to="/discounts">Скидки</NuxtLink></li>
				<li><NuxtLink class="text-light" to="/blog">Новости</NuxtLink></li>
				<li><NuxtLink class="text-light" to="/contacts">Контакты</NuxtLink></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import logo from '~/assets/images/logo.png'

const props = defineProps({
	error: {
		type: Object,
		required: true
	}
})

const handleError = () => {
	clearError({ redirect: '/' })
}

const handleBack = () => {
	window.history.back()
}
</script>

<style scoped lang="scss">
.error-page {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px 0;
	text-align: center;
	color: #f8f9fa;
}

// Логотип в верхней части
.logo-container {
	position: absolute;
	top: 20px;
	left: 20px;
}

.logo {
	width: 150px;
}

// Огромная 404 с рулём
.error-code {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 6rem;
	font-weight: bold;
	gap: 20px;
}

// Руль (вместо нуля)
.steering-wheel {
    color: red;
	width: 80px;
	height: 80px;
	background: url('~/assets/images/steering-wheel.svg') no-repeat center;
	background-size: contain;
}

// Кнопки
.button-container {
	display: flex;
	justify-content: center;
	gap: 20px;
}

// Ссылки
.nav-links {
	list-style: none;
	padding: 0;
	position: absolute;
	bottom: 20px;
    right: 20px;
	display: flex;
	justify-content: center;
	gap: 20px;

	li {
		display: inline;
	}

	a {
		text-decoration: none;
		color: #007bff;
		font-size: 1.2rem;
		transition: color 0.3s;

		&:hover {
			color: #0056b3;
		}
	}
}
</style>
